// User Interface
export interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    avatarUrl?: string | null;
    createdAt: Date;
    restaurants?: Restaurant[]; // Relationship with restaurants
    dishes?: Dish[]; // Relationship with dishes
    ratings?: Rating[]; // Relationship with ratings
    comments?: Comment[]; // Relationship with comments
    votes?: Vote[]; // Relationship with votes
    restaurantSuggestions?: RestaurantSuggestion[]; // Relationship with suggestions
    role?: UserRole; // Optional relationship with UserRole
  }
  
  // Restaurant Interface
  export interface Restaurant {
    id: number;
    name: string;
    address?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    state?: string | null;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    createdBy: number; // User ID that created the restaurant
    updatedAt?: Date | null;
    updatedBy?: number | null;
    dishes?: Dish[]; // Relationship with dishes
  }
  
  // Dish Interface
  export interface Dish {
    id: number;
    restaurantId: number; // The ID of the restaurant the dish belongs to
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    category?: string | null;
    createdAt: Date;
    createdById: number; // The user who created the dish
    updatedAt?: Date | null;
    updatedBy?: number | null;
    ratings?: Rating[]; // Relationship with ratings
    comments?: Comment[]; // Relationship with comments
  }
  
  // Rating Interface
  export interface Rating {
    id: number;
    dishId: number; // The dish being rated
    userId: number; // The user who rated the dish
    rating: number; // 1 to 5 scale
    review?: string | null;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt?: Date | null;
  }
  
  // Comment Interface
  export interface Comment {
    id: number;
    dishId: number; // The dish being commented on
    userId: number; // The user who posted the comment
    comment: string;
    parentCommentId?: number | null; // For replies, references parent comment
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt?: Date | null;
    children?: Comment[]; // Relationship for replies
    votes?: Vote[]; // Relationship for votes
  }
  
  // Vote Interface
  export interface Vote {
    id: number;
    commentId: number; // The comment being voted on
    userId: number; // The user who voted
    voteType: 'upvote' | 'downvote'; // Either an upvote or downvote
    createdAt: Date;
  }
  
  // Restaurant Suggestion Interface
  export interface RestaurantSuggestion {
    id: number;
    name: string;
    address?: string | null;
    description?: string | null;
    suggestedById: number; // The user who suggested the restaurant
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    processedAt?: Date | null;
    processedBy?: number | null; // The user who processed the suggestion
  }
  
  // UserRole Interface
  export interface UserRole {
    userId: number; // The user to whom the role is assigned
    role: 'user' | 'admin' | 'moderator'; // The role of the user
  }
  