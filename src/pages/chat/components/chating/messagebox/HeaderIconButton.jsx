const HeaderIconButton = ({ icon, label }) => {
    return (
        <button
            type="button"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#FFF0F5]">
            {icon}
        </button>
    );
};


export default HeaderIconButton;