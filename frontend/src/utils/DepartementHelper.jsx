export const columns = [
    {
        name: "Id",
        selector: (row) => row.sno
    },
    {
        name: "Nom département ",
        selector: (row) => row.nom_departement
    },
    {
        name: "Action ",
        selector: (row) => <DepartementButton />
    },
]

export const DepartementButton = () => {
    return (
        <div className="flex space-x-3">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">Editer</button>
            <button className="px-2 py-1 bg-red-500 text-white rounded ml-2">Supprimer</button>
        </div>
    )
}