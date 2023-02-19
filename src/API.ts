import {Employee} from "./employee";

const API = {

    getEmployees: () => {
        const employees = localStorage.getItem("employees");
        return employees ? JSON.parse(employees) : [];
    },
    addEmployee: (employee: Employee) => {
        const employees = API.getEmployees();
        employees.push(employee);
        localStorage.setItem("employees", JSON.stringify(employees));
    },
    updateEmployee: (employee: Employee) => {
        const employees = API.getEmployees();
        const index = employees.findIndex((e: { id: any; }) => e.id === employee.id);
        employees[index] = employee;
        localStorage.setItem("employees", JSON.stringify(employees));
    },
    deleteEmployee: (id: string) => {
        console.log(id)
        const employees = API.getEmployees().filter((e: { id: any; }) => e.id !== id);
        localStorage.setItem("employees", JSON.stringify(employees));
    }
};

export default API;
