var pkg 	= require('../config')

module.exports = function banner() {
	return ['/*!',
			' * ' + pkg.info.name,
			' * ' + pkg.info.description,
			' *\n' +
			' * @version ' + pkg.info.version,
			' * @link ' + pkg.info.homepage,
			' * @license ' + pkg.info.license,
			' *\n' +
			' * Copyright ' + new Date().getFullYear() + ', ' + pkg.info.author,
			' * File Generated on ' + new Date() + '\n' +
			' */',
			''].join('\n');
}
