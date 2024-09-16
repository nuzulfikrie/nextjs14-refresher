export default function Footer(){
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-6 text-center">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
        </footer>
    );
}