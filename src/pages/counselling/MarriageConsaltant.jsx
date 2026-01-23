import ConsultantCard from "./consaltant/ConsultantCard";

const MarriageConsaltant = () => {
    const consultantData = [
        { id: 1, name: "Alfaaz Ahmed", image: "../../../src/assets/images/consultant.png" },
        { id: 2, name: "Hania Amir", image: "../../../src/assets/images/consultant.png" },
        { id: 3, name: "Hania Amir", image: "../../../src/assets/images/consultant.png" },
        { id: 4, name: "Alfaaz Ahmed", image: "../../../src/assets/images/consultant.png" },
    ];
    return (
        <div>
            {/* Header Section */}
            <header className="mb-12">
                <h1 className="text-2xl font-bold text-[#58001C] mb-4">
                    Connect with expert marriage consultants
                </h1>
                <p className="text-[#737373] text-base leading-relaxed">
                    Browse through our expert consultants and get personalized guidance to navigate your relationship journey. Our consultants are here to offer tailored advice based on your unique needs and preferences.
                </p>
            </header>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultantData.map((consultant) => (
                    <ConsultantCard
                        key={consultant.id}
                        id={consultant.id}
                        name={consultant.name}
                        imageUrl={consultant.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default MarriageConsaltant;