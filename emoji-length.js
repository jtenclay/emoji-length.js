// https://github.com/jtenclay/emoji-length



// range of surrogate pairs
var surrogatePairs = /[\ud800-\udbff][\udc00-\udfff]/g;

var emojiLength = function(string) {

	// replace pairs of regional indicators (which display emoji country flags) with a single dummy character
	string = string.replace(/\ud83c[\udde6-\uddff]\ud83c[\udde6-\uddff]/g, "_");

	// replace the unofficial emoji flags for England, Scotland and Wales with a single dummy character
	// each of these begins with the black flag emoji and ends with the cancel tag
	string = string.replace(/\ud83c\udff4.+\udb40\udc7f/g, "_");

	// replace skin tone modifiers with an empty string
	string = string.replace(/\ud83c[\udffb-\udfff]/g, "");

	// replace surrogate pairs with a single dummy character
	string = string.replace(surrogatePairs, "_");

	// remove the zero width joiner along with the character that immediately follows
	string = string.replace(/\u200d./g, "");

	// remove variation selection-16, which specifies that the preceding character should be displayed as an emoji
	string = string.replace(/\ufe0f/g, "");

	// remove combining enclosing keycap, which is used after keycap characters
	string = string.replace(/\u20e3/g, "");

	// return the length of the edited string
	return string.length;
};