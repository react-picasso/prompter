import Image from "next/image";

const Loading = () => {
	return (
		<div className="w-full flex-center">
			<Image
				src="assets/icons/loading.svg"
				width={50}
				height={50}
				alt="loading"
				className="object-contain"
			/>
		</div>
	);
};

export default Loading;
