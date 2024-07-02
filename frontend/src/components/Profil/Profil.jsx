import UserPic from '../../assets/UserPic.png';

export default function Profil() {
    return (
        <div>
            {/* Profil section */}

            {/* Username */}
            <div className="flex justify-center p-4 mb-4">
                <h2>Username</h2>
            </div>

            {/* User picture */}
            <div className="flex justify-center p-4 mb-4">
                <div className="avatar">
                    <div className="w-40 md:w-60 rounded">
                        <img src={UserPic} alt="User" />
                    </div>
                </div>
            </div>


 {/* Old tournament section */}
            {/* Button section */}
            <div className="flex justify-center p-4 mb-4">
                <button className="relative h-[50px] overflow-hidden bg-opacity-0 px-3 text-white border-l-4 border-primary shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_20px_var(--tw-shadow-color)] hover:shadow-secondary hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10">Anciens tournois</span>
                </button>
            </div>

            <div className="flex flex-col items-center p-4">
                {/* Tournaments section */}
                <div className="flex flex-wrap justify-center w-full gap-4">
                    <div className="max-w-sm overflow-hidden shadow-lg w-full sm:w-auto">
                        <div className="px-6 py-4 bg-secondary">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm overflow-hidden shadow-lg w-full sm:w-auto">
                        <div className="px-6 py-4 bg-secondary">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm overflow-hidden shadow-lg w-full sm:w-auto">
                        <div className="px-6 py-4 bg-secondary">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
