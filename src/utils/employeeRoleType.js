const EmployeeRoleTypes = Object.freeze({
  TECHNICAL: Object.freeze({
    SOFTWARE_DEVELOPER: 1,
    FRONTEND_DEVELOPER: 2,
    BACKEND_DEVELOPER: 3,
    FULLSTACK_DEVELOPER: 4,
    DEVOPS_ENGINEER: 5,
    DATABASE_ADMIN: 6,
    AI_ML_ENGINEER: 7,
    CYBERSECURITY_ENGINEER: 8,
  }),
  MANAGEMENT: Object.freeze({
    PROJECT_MANAGER: 100,
    PRODUCT_MANAGER: 101,
    TECH_LEAD: 102,
  }),
  DESIGN: Object.freeze({
    UI_UX_DESIGNER: 200,
    GRAPHIC_DESIGNER: 201,
    MOTION_DESIGNER: 202,
  }),
  QUALITY: Object.freeze({
    QA_ENGINEER: 300,
    AUTOMATION_TESTER: 301,
  }),
  BUSINESS: Object.freeze({
    BUSINESS_ANALYST: 400,
    SALES_MARKETING: 401,
    FINANCE_MANAGER: 402,
    HR_MANAGER: 403,
    CUSTOMER_SUPPORT_MANAGER: 404,
  }),
  EXECUTIVE: Object.freeze({
    CEO: 500,
    CTO: 501,
    MD: 502,
  }),
});

const getAllEmployeeRoleValues = (obj) => {
  return Object.values(obj).flatMap((value) =>
    typeof value === "object" ? getAllEmployeeRoleValues(value) : value
  );
};

function employeeRoleExists(value, obj) {
  return Object.values(obj).some((v) =>
    typeof v === "object" ? employeeRoleExists(value, v) : v === value
  );
}

module.exports = {
  EmployeeRoleTypes,
  getAllEmployeeRoleValues,
  employeeRoleExists,
};
