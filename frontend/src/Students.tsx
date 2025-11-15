"use client"; // needed if you’re in Next.js 13+ App Router
import { useEffect, useState } from "react";

interface Student {
  student_id: number;
  name: string;
  gender: string;
  email: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.student_id}>
              <td className="border px-4 py-2">{s.student_id}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.gender}</td>
              <td className="border px-4 py-2">{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}