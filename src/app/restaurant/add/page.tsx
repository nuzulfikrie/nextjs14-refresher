'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    description: z.string().optional(),
    latitude: z.string().refine(val => !val || !isNaN(parseFloat(val)), {
        message: "Latitude must be a valid number"
    }).transform(val => val ? parseFloat(val) : null),
    longitude: z.string().refine(val => !val || !isNaN(parseFloat(val)), {
        message: "Longitude must be a valid number"
    }).transform(val => val ? parseFloat(val) : null),
});
type FormData = z.infer<typeof formSchema>;

export default function AddRestaurant() {
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [supabase, setSupabase] = useState<any>(null);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
            description: '',
            latitude: '',
            longitude: '',
        },
    });

    useEffect(() => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            setError('Missing Supabase environment variables');
            return;
        }

        setSupabase(createClient(supabaseUrl, supabaseAnonKey));
    }, []);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };

            try {
                const compressedFile = await imageCompression(file, options);
                setImageFile(compressedFile);
                setImagePreview(URL.createObjectURL(compressedFile));
            } catch (error) {
                console.error('Error compressing image:', error);
                setError('Failed to process image');
            }
        }
    };

    const uploadImage = async (file: File) => {
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('restaurant-bucket')
            .upload(fileName, file);

        if (error) throw error;
        //get error trace
        
        return data.path;
    };

    const onSubmit = async (data: FormData) => {
        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const restaurantData = {
                ...data,
                latitude: data.latitude === '' ? null : Number(data.latitude),
                longitude: data.longitude === '' ? null : Number(data.longitude),
                imageUrl,
                createdBy: 1, // Replace with the authenticated user ID in a real scenario
            };

            const response = await fetch('/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurantData),
            });

            if (!response.ok) {
                throw new Error('Failed to add restaurant');
            }

            const responseData = await response.json();
            console.log('Restaurant added:', responseData);
            router.push('/restaurants');
        } catch (err) {
            setError('Failed to add restaurant');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Restaurant</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs" />
                        )}
                    </FormItem>

                    <Button type="submit">Add Restaurant</Button>
                </form>
            </Form>
        </div>
    );
}