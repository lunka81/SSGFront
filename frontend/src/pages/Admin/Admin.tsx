import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../auth";
import Header from "./components/Header";
import Summary from "./components/Summary";
import AddPerson from "./components/AddPerson";
import Sidebar from "./components/Sidebar";
import StoredPersons, { type Person } from "./components/StoredPersons";
import { User, Check, X, ChartNoAxesColumn } from "lucide-react";
import { createEmployee } from "./components/EmployeeCreate";
import "./Admin.css";

// Tillfälliga testpersoner tills listan hämtas från databasen
const testPersons: Person[] = [
  { id: 1, name: "Anna Svensson", access: "Standard", department: "Production", active: true },
  { id: 2, name: "Erik Johansson", access: "Admin", department: "IT", active: true },
  { id: 3, name: "Lisa Karlsson", access: "Limited", department: "Visitor", active: true },
  { id: 4, name: "Johan Nilsson", access: "Standard", department: "Maintenance", active: false },
];

function Admin() {
  // Admin äger listan och delar ut den till AddPerson och StoredPersons
  const [persons, setPersons] = useState(testPersons);

  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  // Anropas av AddPerson när man klickar "Add person"
function addPerson(
  name: string,
  access: string,
  description: string
): void {
  const newPerson: Person = {
    id: Date.now(),
    name,
    access,
    department: description,
    active: true,
  };

  setPersons((previous) => [...previous, newPerson]);
}

  function deletePerson(id: number) {
    // Behåller alla personer utom den med detta id
    setPersons(persons.filter((person) => person.id !== id));
  }

async function handleAddPerson(
  name: string,
  access: string,
  description: string,
  image: string
): Promise<void> {
  if (
    access !== "Standard" &&
    access !== "Admin" &&
    access !== "Limited"
  ) {
    throw new Error("Ogiltig roll.");
  }

  const employee = await createEmployee({
  name,
  role: access,
  description,
  img: image,
});

  addPerson(employee.name, access, description);
}
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="app">
        <div className="content">
          <Header />

          {/*De fyra korten ligger i ett rutnät*/}
          <div className="event-summary">
            <Summary
              icon={<User size={28} />}
              iconClass="summary-icon"
              value="24"
              label="Registered persons"
              sub="Total"
            />
            <Summary
              icon={<Check size={28} />}
              iconClass="summary-icon approved"
              value="18"
              label="Approved entries"
              sub="Today"
            />
            <Summary
              icon={<X size={28} />}
              iconClass="summary-icon"
              value="2"
              label="Denied entries"
              sub="Today"
            />
            <Summary
              icon={<ChartNoAxesColumn size={28} />}
              iconClass="summary-icon"
              value="96%"
              label="Average confidence"
              sub="Last 30 days"
            />
          </div>

          <div className="mid-content">
            <AddPerson onAdd={handleAddPerson} />
            <StoredPersons persons={persons} onDelete={deletePerson} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;