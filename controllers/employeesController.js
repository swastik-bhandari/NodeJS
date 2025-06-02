const data = {
  employees : require('../data/employees.json'),
  setEmployees : function (data) { this.employees = data ;}
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id : String(Number(data.employees[data.employees.length-1].id)+1 || 1),
    firstname : req.body.firstname,
    lastname : req.body.lastname
  }

  if(!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(404).json({"message" : "require both first and last name"});
  }

  data.setEmployees([...data.employees , newEmployee]);
  res.json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find((emp)=> emp.id===req.body.id);

  if(!employee) {
    return res.status(400).json({"message" : "id not found"});
  }

  if(req.body.firstname) employee.firstname = req.body.firstname;
  if(req.body.lastname) employee.lastname = req.body.lastname;

  const filteredArray = data.employees.filter( emp => emp.id!==employee.id);
  const unsortedArray = [...filteredArray , employee];
  const sortedArray = unsortedArray.sort((a , b)=> a.id > b.id ? 1 : a.id<b.id?-1 :0);
  data.setEmployees(sortedArray);
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(emp=> emp.id===req.body.id);
  if(!employee) {
    return res.status(400).json({"message" : "id not found"});
  }
  const filteredArray = data.employees.filter(emp => emp.id !==employee.id);
  data.setEmployees(filteredArray);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(emp => emp.id===req.params.id);
  if(!employee) {
    return res.status(400).json({"message" : "id not found"});
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};
