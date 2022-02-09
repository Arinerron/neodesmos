define('loadcss', {
    load: function(id) {
        throw new Error("Dynamic load not allowed: " + id);
    }
});
