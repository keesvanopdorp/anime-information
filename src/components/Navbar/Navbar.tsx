import Link from "next/link";

export default function Navbar() {
	return (
		<div className="flex py-[20px] px-[15px] bg-black text-white">
			<h2 className="text-lg me-3">Anime information</h2>
			<div>
				<Link href={"/"}>Home</Link>
			</div>
		</div>
	);
}
