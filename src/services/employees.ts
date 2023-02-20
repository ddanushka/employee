import { Employee } from "../interfaces/employee";

const Employees = {

    getEmployees: (): Employee[] => {
        const employees = localStorage.getItem("employees");
        return employees ? JSON.parse(employees) : [];
    },
    addEmployee: (employee: Employee): void => {
        const employees = Employees.getEmployees();
        employees.push(employee);
        localStorage.setItem("employees", JSON.stringify(employees));
    },
    updateEmployee: (employee: Employee): void => {
        const employees = Employees.getEmployees();
        const index = employees.findIndex(e => e.id === employee.id);
        employees[index] = employee;
        localStorage.setItem("employees", JSON.stringify(employees));
    },
    deleteEmployee: (id: string): void => {
        const employees = Employees.getEmployees().filter(e => e.id !== id);
        localStorage.setItem("employees", JSON.stringify(employees));
    }
};

export default Employees;
