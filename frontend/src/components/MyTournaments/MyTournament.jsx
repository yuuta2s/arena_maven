import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function MyTournament() {
    
    return (
        <div>
            <div className="flex flex-col items-center sm:max-w-md md:max-w-xl lg:max-w-4xl mt- mb-24 pb-4 sm:pb-6 md:pb-10 lg:pb-14 mx-auto bg-no-repeat bg-bottom bg-underline-title bg-contain ">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white ">Mes Tournois</h1>
            </div>
            <section className="max-w-7xl mx-auto">
                <article className="mt-8">
                <h2 className="text-3xl text-white">Registered tournaments :</h2>
                    <div className="flex flex-wrap items-center justify-evenly">

                    </div>
                </article>
                <article className="mt-8">
                <h2 className="text-3xl text-white">tournaments created :</h2>
                    <div className="flex flex-wrap items-center justify-evenly">

                    </div>
                </article>
            </section>
        </div>
    )
}