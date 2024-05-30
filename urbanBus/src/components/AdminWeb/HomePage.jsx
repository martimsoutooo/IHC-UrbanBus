export default function HomePage({setCurrentPage}) {

    return (
        <div>
            <div className="mb-20">
                <h1 className="text-5xl font-bold mb-2">Welcome to UrbanBus</h1>
                <p className="text-2xl">Choose any option</p>
            </div>

            <div className="overflow-x-auto flex flex-wrap gap-12 justify-evenly pb-10 cardsContainer">
                <button className="card card-bordered w-96 bg-base-100 shadow-xl"
                        onClick={() => setCurrentPage('Stops')}>
                    <div className="card-body flex flex-row gap-7">
                        <svg className="size-16 my-auto mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill='#333c4d'
                                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                        </svg>
                        <div className="my-auto">
                            <h1 className="card-title text-4xl">Stops</h1>
                            <p></p>
                        </div>
                    </div>
                </button>

                <button className="card card-bordered w-96 bg-base-100 shadow-xl"
                        onClick={() => setCurrentPage('Lines')}>
                    <div className="card-body flex flex-row gap-7">
                        <svg className="size-16 my-auto mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill='#333c4d'
                                  d="M512 96c0 50.2-59.1 125.1-84.6 155c-3.8 4.4-9.4 6.1-14.5 5H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c53 0 96 43 96 96s-43 96-96 96H139.6c8.7-9.9 19.3-22.6 30-36.8c6.3-8.4 12.8-17.6 19-27.2H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-53 0-96-43-96-96s43-96 96-96h39.8c-21-31.5-39.8-67.7-39.8-96c0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8C59.8 473 0 402.5 0 352c0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9c-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                        </svg>
                        <div className="my-auto">
                            <h1 className="card-title text-4xl">Lines</h1>
                            <p></p>
                        </div>
                    </div>
                </button>

                <button className="card card-bordered w-96 bg-base-100 shadow-xl"
                        onClick={() => setCurrentPage('Tickets')}>
                    <div className="card-body flex flex-row gap-7">
                        <svg className="size-16 my-auto mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill='#333c4d'
                                  d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"/>
                        </svg>
                        <div className="my-auto">
                            <h1 className="card-title text-4xl">Tickets</h1>
                            <p></p>
                        </div>
                    </div>
                </button>

                <button className="card card-bordered w-96 bg-base-100 shadow-xl"
                        onClick={() => setCurrentPage('Clients')}>
                    <div className="card-body flex flex-row gap-7">
                        <svg className="size-16 my-auto mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path fill='#333c4d'
                                  d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
                        </svg>
                        <div className="my-auto">
                            <h1 className="card-title text-4xl">Clients</h1>
                            <p></p>
                        </div>
                    </div>
                </button>

                <button className="card card-bordered w-96 bg-base-100 shadow-xl"
                        onClick={() => setCurrentPage('Validations')}>
                    <div className="card-body flex flex-row gap-7">
                        <svg className="size-16 my-auto mx-1" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill='#333c4d'
                                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                        </svg>
                        <div className="my-auto">
                            <h1 className="card-title text-4xl">Validations</h1>
                            <p></p>
                        </div>
                    </div>
                </button>

                <button className="card card-bordered w-96 bg-base-100 shadow-xl"
                        onClick={() => setCurrentPage('Journeys')}>
                    <div className="card-body flex flex-row gap-7">
                        <svg className="size-16 my-auto mx-1" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill='#333c4d'
                                  d="M288 0C422.4 0 512 35.2 512 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H192v32c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C64 35.2 153.6 0 288 0zM128 160v96c0 17.7 14.3 32 32 32H272V128H160c-17.7 0-32 14.3-32 32zM304 288H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H304V288zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16s7.2 16 16 16H368c8.8 0 16-7.2 16-16z"/>
                        </svg>
                        <div className="my-auto">
                            <h1 className="card-title text-4xl">Journeys</h1>
                            <p></p>
                        </div>
                    </div>
                </button>
            </div>
            <style>{`
                .cardsContainer {
                    height: 550px
                }
                `}
            </style>
        </div>
    );
}