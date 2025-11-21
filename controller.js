export const UsernameController = (req, res) => {
    const { username } = req.params;
    res.send(`welcome ${username}`);
};

export const searchController = (req, res) => {
    const { keyword } = req.query;
    res.send(`welcome ${keyword}`);
};
