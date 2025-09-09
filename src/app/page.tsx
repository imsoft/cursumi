import Silk from "@/components/backgrounds/silk";

const Home = () => {
  return (
    <>
      <div className="h-screen w-screen relative">
        <Silk
          speed={5}
          scale={1}
          color="#5b21b6"
          noiseIntensity={1.5}
          rotation={0}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            Cursumi
          </h1>
          <div className="text-center space-y-2">
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              🚧 We&apos;re building something incredible
            </p>
            <p className="text-lg text-white/70">
              Soon you&apos;ll have access to a unique learning experience
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
