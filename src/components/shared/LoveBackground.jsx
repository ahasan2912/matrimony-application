import loveIcon from '../../assets/images/svg/loveIcon.svg';
const LoveBackground = ({top, bottom}) => {
    return (
        <div>
            <img src={loveIcon} className={`hidden sm:block absolute top-${top} left-20 text-pink-100 text-6xl`} />
            <img src={loveIcon} className={`hidden sm:block absolute bottom-${bottom} right-20 text-pink-100 text-4xl`} />
        </div>
    );
};

export default LoveBackground;