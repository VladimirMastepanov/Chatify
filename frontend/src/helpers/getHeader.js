const getHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export default getHeader;
