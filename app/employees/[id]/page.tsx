"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout } from "@/components/DashboardLayout";

type Employee = {
    _id: string;
    name: string;
    father_name: string;
    email: string;
    phone_number: string;
    mobile_number: string;
    join_date: string;
    salary: number;
    employee_type: string;
    role: string;
    cnic: string;
    city: string;
    incentive_type: string;
    incentive_percentage: number;
    profile_photo: string;
    cnic_front: string;
    cnic_back: string;
    e_stamp: string;
    cheque_photo: string;
};

export default function EmployeeProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch("/api/items")
            .then((res) => res.json())
            .then((data) => {
                const emp = data.users.find((u: Employee) => u._id === id);
                setEmployee(emp || null);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <DashboardLayout>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-gray-100">
                        {employee?.name || "Employee"}'s Profile
                    </h2>
                </div>

                <Card className="border dark:border-gray-700 dark:bg-gray-800">
                    {loading ? (
                        <div className="p-6 space-y-6">
                            <div className="flex items-center space-x-6">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-8">
                                {[...Array(12)].map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                                ))}
                            </div>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-red-500">Error: {error.message}</div>
                    ) : employee ? (
                        <>
                            <CardHeader className=" border-b border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                                    <Avatar className="h-20 w-20 border-2 border-teal-500">
                                        {employee.profile_photo ? (
                                            <AvatarImage
                                                src={`${employee.profile_photo}`}
                                                alt="Profile"
                                                crossOrigin="anonymous"
                                            />
                                        ) : (
                                            <AvatarFallback>
                                                {employee.name.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <h2 className="text-[18.72px] font-semibold text-[#059691] dark:text-teal-400">
                                            {employee.name}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            {employee.email || "No email"}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6 mt-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    <EmployeeField label="Name" value={employee.name} />
                                    <EmployeeField label="Father Name" value={employee.father_name} />
                                    <EmployeeField label="Email" value={employee.email} />
                                    <EmployeeField label="Phone Number" value={employee.phone_number} />
                                    <EmployeeField label="Mobile No" value={employee.mobile_number} />
                                    <EmployeeField
                                        label="Joining Date"
                                        value={
                                            employee.join_date
                                                ? new Date(employee.join_date).toLocaleDateString("en-GB")
                                                : "N/A"
                                        }
                                    />
                                    <EmployeeField label="Salary" value={employee.salary ? `$${employee.salary}` : "N/A"} />
                                    <EmployeeField label="Employee Type" value={employee.employee_type} />
                                    <EmployeeField label="Role" value={employee.role} />
                                    <EmployeeField label="CNIC" value={employee.cnic} />
                                    <EmployeeField label="City" value={employee.city} />
                                    <EmployeeField label="Incentive Type" value={employee.incentive_type} />
                                    <EmployeeField
                                        label="Incentive Percentage"
                                        value={employee.incentive_percentage ? `${employee.incentive_percentage}%` : "N/A"}
                                    />
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <div className="p-6 text-gray-500 dark:text-gray-300">Employee not found.</div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}

// Small component for field
const EmployeeField = ({
    label,
    value,
}: {
    label: string;
    value: string | number | undefined;
}) => (
    <div className="space-y-2">
        <Label className="dark:text-gray-300">{label}</Label>
        <Input
            disabled
            value={value || "N/A"}
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
    </div>
);
