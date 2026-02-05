import Image, { StaticImageData } from "next/image";

export default function HeroSection({
  Description,
  StaticImage,
  message,
  title,
}: {
  StaticImage: StaticImageData | string;
  Description: string;
  message: string;
  title: string;
}) {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden top-margin ">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F8A70] to-green-600 z-0">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={StaticImage}
            alt="Background pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-white/90 text-sm font-medium">{message}</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {Description}
          </p>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}