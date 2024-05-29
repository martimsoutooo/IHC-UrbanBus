import React from "react";

export default function TicketsPage() {
    return (
        <div>
            <div className="flex flex-row items-center">
                <div>
                    <h1 className="text-4xl font-bold">Tickets</h1>
                    <p className="text-xl">Here you can manage the tickets</p>
                </div>

                <button className="btn btn-neutral ml-auto mr-8">
                    Add line
                </button>
            </div>

            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Zone</th>
                        <th>Client</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}