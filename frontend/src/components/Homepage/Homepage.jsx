import React from 'react';
import design2 from '../../assets/Rectangle 261.svg';
import mkLogo from '../../assets/mkLogo.png'

export default function Homepage() {



  return (
    <div className=" bg-gradient-to-tr from-black via-vertBG to-black p-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-white">Become an Arena Maven</h1>
        <div className="w-full h-20 flex justify-center absolute top-3.5 right-3.5">
          <img src={design2} alt="Design" />
        </div>
      </div>
      <section className="flex justify-evenly items-center">
        <div className="p-3">
          <h2 className="text-3xl font-bold text-white p-3">Ici c'est que la win !</h2>
          <div className="flex justify-between items-center gap-3">
            <button class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
              Create a tournament
            </button>
            <button class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
              Find a tournament
            </button>
          </div>
        </div>
        <div>
          <img src={mkLogo} alt="" />
        </div>
      </section>
      <section>
        <article className="mt-8">
          <h2 className="text-2xl text-white">Hottest :</h2>
          <div className="flex items-center justify-evenly">
              <p>image 1 tournois</p>{/* <img src="" alt="" /> */}
              <p>image 2 tournois</p>{/* <img src="" alt="" /> */}
              <p>image 3 tournois</p>{/* <img src="" alt="" /> */}
          </div>
        </article>
        <article className="mt-8">
          <h2 className="text-2xl text-white">Last Chance :</h2>
          <div className="flex items-center justify-evenly">
              <p>image 1 tournois</p>{/* <img src="" alt="" /> */}
              <p>image 2 tournois</p>{/* <img src="" alt="" /> */}
              <p>image 3 tournois</p>{/* <img src="" alt="" /> */}
          </div>
        </article>
      </section>
    </div>
  );
}