var slug = function (input) {
  return input
    .replace(/^http:\/\/www/g, '')
    .replace(/^http:\/\//g, '')
    .replace(/^\s\s*/, '') // Trim start
    .replace(/\s\s*$/, '') // Trim end
    .toLowerCase() // Camel case is bad
    .replace(/[^a-z0-9_\-~!\+\s]+/g, '') // Exchange invalid chars
    .replace(/[\s]+/g, '-'); // Swap whitespace for single hyphen
};

module.exports = {
  slug: slug
};