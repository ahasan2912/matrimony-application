import { ShieldCheck, RefreshCcw, Truck, Lock } from 'lucide-react'; // Using Lucide for icons
import { categories } from '../../lib/data';

const ShopByCategory = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-16">
        {[
          { icon: <ShieldCheck size={20} />, text: "Premium Quality" },
          { icon: <RefreshCcw size={20} />, text: "Easy Return" },
          { icon: <Truck size={20} />, text: "National Delivery" },
          { icon: <Lock size={20} />, text: "Safe Payment" },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-center gap-3 bg-white border border-gray-100 p-6 rounded-md shadow-sm">
            <span className="text-gray-600">{item.icon}</span>
            <span className="font-medium text-gray-800 text-sm">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Shop By Category</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <div key={cat.id} className="group relative overflow-hidden cursor-pointer">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
              <img 
                src={cat.imageUrl} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute bottom-4 left-4">
              <button className="bg-slate-900 text-white text-xs px-4 py-2 font-medium rounded-sm">
                {cat.label}
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white text-xl font-bold uppercase tracking-[0.2em] opacity-80">
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;