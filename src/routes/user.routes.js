const express= require('express');


const router = express.Router();

router.post('/signup', signUp);


router.get('/signin', signIn)
router.get('/user/public', (req, res) => {
    res.status(200).json({ message: 'This is a public endpoint' });
});

router.get ('/user/profile', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected endpoint', user: req.user });
});

router.get('/reports', protect, authorizeRoles('moderator', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Moderator or admin can access this endpoint' });
});

router.delete('/admin/delete-user/:id', protect, authorizeRoles('admin'), async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });

        router.post('/promote/:id', protect, authorizeRoles('admin'), async (req, res) => {
            const userId = req.params.id;
            try {
                const user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                } if (user.role === 'admin') {
                    return res.status(400).json({ message: 'User is already an admin' });
                }
                user.role = 'admin';
                await user.save();
                return res.status(200).json({ message: 'User promoted to admin successfully' });
            } user.role = 'moderator';{
            await user.save();
            try 
            {
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
};



module.exports = router;
