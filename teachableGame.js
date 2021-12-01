module.exports = function TeachableMachine(pool) {

    async function login(req, res, next) {
        try {
            var loggedIn = req.body.username;
            var result = await machineGame.player(loggedIn);
            var loggedInLength = await machineGame.getPlayers(loggedIn);
            if (loggedIn == "" || result == 0 || loggedInLength == 0) {
                req.flash('alert', 'Sign-up as a player to get a username')
                res.redirect('/signup')
            }
            res.render('level1', {
                results: result,
                workDays: await machineGame.userDaysSelected(loggedIn),
                Aweek: await machineGame.DaysToPiickAt(loggedIn)
            });
        } catch (error) {
            next(error);
        }
    };

    async function player(loggedIn) {
        var alreadyExist = await pool.query("SELECT * FROM players WHERE username = $1", [loggedIn]);
        if (alreadyExist.rows.length == 0) {
            message = "Username not found";
            return 0
        } else {
            return alreadyExist.rows;
        }
    }

    async function getPlayers(loggedIn) {
        var alreadyExist = await pool.query("SELECT * FROM players WHERE username = $1", [loggedIn]);
            return alreadyExist.rows.length;
    }

    return {
        login,
        player,
        getPlayers
    }
}