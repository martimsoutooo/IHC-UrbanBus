export default function ValidationsPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold">Validations</h1>
            <p className="text-xl">Here you can manage the validations</p>

            <select className="select select-bordered w-full max-w-xs mt-10">
                <option>Stops</option>
                <option>Journey Instances</option>
            </select>
            <div className="overflow-x-auto mt-4 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Time</th>
                        <th>Zone</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}