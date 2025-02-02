export const fetchGetRoles = () => fetch("http://localhost:3005/roles").then((res) => res.json());
