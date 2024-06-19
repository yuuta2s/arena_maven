export default function SmallCards({ tournament, index }) {
    return (
      <>
        <div className="relative w-80 h-48 overflow-hidden rounded-lg">
          <h3 className="text-2xl text-white absolute bottom-2 left-2 bg-black rounded-lg bg-opacity-40 p-1">{tournament.name}</h3>
          
          <img key={index} className="w-full h-full object-cover" src={tournament.tournament_img} alt={`image tournois ${index + 1}`} />
        </div>
      </>
    );
  }
  