"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Eye, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/DashboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

type Employee = {
    _id: string;
    name: string;
    father_name: string;
    mobile_number: string;
    employee_type: string;
    join_date: string;
    area_id?: { name: string }[];
    status: string;
};

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        fetch("/api/items")
            .then((res) => res.json())
            .then((data) => setEmployees(data?.users || []))
            .finally(() => setLoading(false));
    }, []);

    const sortedEmployees = useMemo(() => {
        const copy = [...employees];
        copy.sort((a, b) => {
            const aVal = (a as any)[sortConfig.key] || "";
            const bVal = (b as any)[sortConfig.key] || "";
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
        return copy;
    }, [employees, sortConfig]);

    const filteredEmployees = sortedEmployees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.father_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.mobile_number.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredEmployees.length / pageSize);
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (key: string) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getSortIcon = (key: string) => {
        if (sortConfig.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />;
        return sortConfig.direction === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
    };

    return (
        <DashboardLayout>
            <div className="md:p-6 bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <Input
                            type="text"
                            placeholder="Search by name/father/mobile"
                            className="border rounded px-2 py-1 w-64 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="dark:border-gray-700">
                            <TableHeader>
                                <TableRow className="bg-gray-100 dark:bg-gray-700">
                                    <TableHead>No</TableHead>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => handleSort("name")}>
                                            Name {getSortIcon("name")}
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => handleSort("father_name")}>
                                            Father {getSortIcon("father_name")}
                                        </Button>
                                    </TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="text-center py-6">
                                             <LoadingSpinner text="Loading employees..." />
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedEmployees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-4 dark:text-gray-300">
                                            No employees found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedEmployees.map((emp, idx) => (
                                        <TableRow key={emp._id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
                                            <TableCell className="dark:text-gray-100">{(currentPage - 1) * pageSize + idx + 1}</TableCell>
                                            <TableCell className="dark:text-gray-100">{emp.name}</TableCell>
                                            <TableCell className="dark:text-gray-100">{emp.father_name}</TableCell>
                                            <TableCell className="dark:text-gray-100">{emp.mobile_number}</TableCell>
                                            <TableCell className="dark:text-gray-100">{emp.employee_type}</TableCell>
                                            <TableCell className="dark:text-gray-100">{emp.status}</TableCell>
                                            <TableCell className="flex gap-1 justify-center">
                                                <Button size="sm" onClick={() => router.push(`/employees/${emp._id}`)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm">
                                                    <User className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex flex-wrap justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="dark:text-gray-100">
                            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredEmployees.length)} of {filteredEmployees.length}
                        </div>
                        <div className="flex gap-2 md:mt-0 mt-2">
                            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
