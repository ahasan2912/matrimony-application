
const Footer = () => {
    return (
        <footer className="bg-pink-50/50 pt-12">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
                <div>
                    <div className="bg-[#FF2D55] text-white px-6 py-2 w-fit rounded-md mb-8 font-bold text-xl">Logo</div>
                    <h3 className="font-bold text-lg mb-4">Contact Information:</h3>
                    <p className="flex items-center gap-2 text-gray-700 mb-2">📧 Email: support@example.com</p>
                    <p className="flex items-center gap-2 text-gray-700">📞 Phone: +1-234-567-8901</p>
                </div>

                <div className="flex flex-col gap-4 text-gray-600 font-medium">
                    <a href="#">About Us</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Help & Support</a>
                </div>

                <div className="flex gap-4 md:justify-end text-2xl text-[#B30042]">
                    <i className="fab fa-facebook cursor-pointer"></i>
                    <i className="fab fa-instagram cursor-pointer"></i>
                    <i className="fab fa-youtube cursor-pointer"></i>
                </div>
            </div>

            <div className="bg-[#B30042] text-white py-4 text-center text-sm font-medium">
                © 2026 Rishta Pro. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;