export const UsernameController = (req, res) => {
    const { username } = req.params;
    res.send(`welcome ${username}`);
};

export const searchController = (req, res) => {
    const { keyword } = req.query;
    res.send(`welcome ${keyword}`);
};

export const updateUserController = (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: "Missing fields",
                message: "Both name and email are required"
            });
        }

        res.status(200).json({
            message: `user ${userId} updated to ${name} with ${email}`
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};