import ContentLoader from "react-content-loader";

const Skeleton = (props) => {
  return (
    <ContentLoader
      speed={3}
      width={280}
      height={457.5}
      viewBox="0 0 280 457.5"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
      {...props}
    >
      <circle cx="140" cy="123" r="123" />
      <rect x="0" y="270" rx="5" ry="5" width="280" height="24" />
      <rect x="0" y="310" rx="5" ry="5" width="280" height="84" />
      <rect x="0" y="414" rx="5" ry="5" width="280" height="44" />
    </ContentLoader>
  );
};

export default Skeleton;
