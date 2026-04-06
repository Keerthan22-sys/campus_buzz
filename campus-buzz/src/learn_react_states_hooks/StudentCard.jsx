function StudentCard({ name, branch, marks }) {
    const grade = marks >= 80 ? "Distinction" : marks >= 60 ? "First Class" : marks >= 50 ? "Second Class" : "Fail";
    const gradeColor = marks >= 80 ? "text-green-600" : marks >= 60 ? "text-blue-600" : marks >= 50 ? "text-yellow-600" : "text-red-600";

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-700 mb-1">Branch: {branch}</p>
            <p className="text-gray-700 mb-1">Marks: {marks}</p>
            <p className={`font-semibold ${gradeColor}`}>Grade: {grade}</p>
        </div>
    );
}

export default StudentCard;