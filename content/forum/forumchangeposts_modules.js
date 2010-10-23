//**********************************************************
/**
* forumchangeposts_modules.js
* module collection of forumchangeposts.js
* @author convinced
*/



//**********************************************************
/**
* forumcopypostid.js
* Foxtrick Copies post id to clipboard
* @author convinced
*/

var FoxtrickFormatPostingText = {

	MODULE_NAME : "FormatPostingText",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array('forumWritePost','messageWritePost','guestbook','announcements','ads','newsletter',"forumModWritePost"),
	NEW_AFTER_VERSION: "0.5.1.2",
	LATEST_CHANGE:"Fixes display error",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	DEFAULT_ENABLED : true,

	run : function( page, doc ) {
		try {
			//format view
			if (page=='messageWritePost' || page=='guestbook') {
				try{
					var org = new Array(/\[pre\](.*?)\[\/pre\]/gi , /·/gi);
					var rep = new Array("<pre>$1</pre>", "");
					var messages = Foxtrick.getElementsByClass("feedItem", doc );
					for (var i = 0; i < messages.length; i++){
						var count_pre = Foxtrick.substr_count(messages[i].innerHTML, '[pre');
						// Foxtrick.dump('FORMAT TEXT ' + count_pre + '\n');
						for (var j = 0; j <= count_pre; j++) {
							for ( var k = 0; k < org.length; k++) {
								messages[i].innerHTML = messages[i].innerHTML.replace(org[k],rep[k]);
							}
						}
					}
				} catch(e_format) {Foxtrick.dump('FormatPostingText: FORMAT TEXT ' + e_format + '\n');}
			}
			else { // reformat edit
				var textarea = doc.getElementById("mainBody").getElementsByTagName("textarea")[0];
				if (textarea) textarea.value = FoxtrickFormatPostingText.reformat(textarea.value);
			}
			
			// add to all targets. send button unclear (eg MyHattrick/Inbox/Default.aspx?actionType=readMail) . doesn't harm to add it to all
			var targets = doc.getElementById("mainBody").getElementsByTagName("input");  // Forum
			for (var i = 0; i < targets.length; ++i) {
				if (targets[i].type == "submit") {
					targets[i].addEventListener("click", this.submitListener, false);
				}
			}
		}
		catch (e) {
			Foxtrick.dumpError(e);
		}
	},

	reformat : function(string) {
	try{
			var org = new Array(/\[pre\](.*?)\[\/pre\]/gi , /·/gi);
			var rep = new Array("[pre]$1[/pre]", "");
			var count_pre = Foxtrick.substr_count(string, '[pre');
			for (var j = 0; j <= count_pre; j++) {
				for ( var k = 0; k < org.length; k++) {
						string = string.replace(org[k],rep[k]);
				}
			}
			return string;
		} catch(e){Foxtrick.dumpError(e);}
	},

	format : function(string) {
			string = string
				.replace(/·/gi, "")
				.replace(/(\<)(\S)/gi, "<·$2");

				var vstring = string.split('[pre]');
				var r_string = vstring[0]
				for (var j = 1; j < vstring.length; j++) {
					var ivstring = vstring[j].split('[/pre]');
					r_string += '[pre]'+ivstring[0].replace(/\[/g,'[·');

					for ( var k = 1; k < ivstring.length; k++) {
						r_string += '[/pre]'+ivstring[k];
					}
				}
			return r_string;
	},

	submitListener : function(ev) {
	try{
		var doc = ev.target.ownerDocument;
		var textarea = doc.getElementById("mainBody").getElementsByTagName("textarea")[0];
		textarea.value = FoxtrickFormatPostingText.format(textarea.value);
	} catch(e){Foxtrick.dumpError(e);}
	}
};


var FoxtrickEmbedMedia = {

	MODULE_NAME : "EmbedMedia",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array('forumWritePost','messageWritePost','guestbook','announcements','ads','newsletter',"forumModWritePost"),
	NEW_AFTER_VERSION: "0.5.2.1",
	LATEST_CHANGE:"Embeds pictures and some video links",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
	DEFAULT_ENABLED : true,

	run : function( page, doc ) {
		try {
		}
		catch (e) {
			Foxtrick.dumpError(e);
		}
	},
};



var FoxtrickCopyPostID = {

	MODULE_NAME : "CopyPostID",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	NEW_AFTER_VERSION: "0.5.1.3",
	LATEST_CHANGE:"Added [post=..] to copied post id",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	DEFAULT_ENABLED : true,
	OPTIONS : new Array("AddCopyIcon")
};

//**********************************************************
/**
* forumcopyposting.js
* Foxtrick Copies posting to clipboard
* @author convinced
*/
var FoxtrickCopyPosting = {

	MODULE_NAME : "CopyPosting",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	NEW_AFTER_VERSION: "0.5.2.1",
	LATEST_CHANGE:"Styles as popup",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	DEFAULT_ENABLED : true,
};

//**********************************************************
/**
 * forumalterheaderline.js
 * Foxtrick Truncate long nicks in forum posts module
 * @author larsw84/convinced
 */

var FoxtrickForumAlterHeaderLine = {

	MODULE_NAME : "ForumAlterHeaderLine",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	DEFAULT_ENABLED : false,
	NEW_AFTER_VERSION: "0.4.9.1",
	LATEST_CHANGE:"HideOldTime fixing for some dateformats",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	OPTIONS : new Array("SingleHeaderLine", "CheckDesign","TruncateLongNick","TruncateLeagueName","HideOldTime",
						"SmallHeaderFont","ShortPostId","ReplaceSupporterStar","BookmarkHeaderSmall","HighlightThreadOpener"),
	OPTIONS_CSS: new Array (Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_Single.css",
							Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_CheckDesign.css",
							"",
							"",
							"",
							Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_Smallsize_Single.css",
							"",
							Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_RemoveSupporterStar.css",
							Foxtrick.ResourcePath+"resources/css/fixes/BookmarkHeaderSmall.css"),

	CSS_SIMPLE : Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_Single_SimpleFix.css"
};


//**********************************************************
/**
 * forumredirmanagertoteam.js
 * Foxtrick redirect from manager to team page
 * @author convinced
 */

var FoxtrickForumRedirManagerToTeam = {

	MODULE_NAME : "ForumRedirManagerToTeam",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	DEFAULT_ENABLED : false
};


//**********************************************************
/**
 * forummovelinks.js
 * Foxtrick Move Links in forum posts module
 * @author larsw84
 */

var FoxtrickMoveLinks = {

	MODULE_NAME : "MoveLinks",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	DEFAULT_ENABLED : false
};


//**********************************************************
/**
 * forumhideavataruserinfo.js
 * Foxtrick Hide Manager Avatar User Info module
 * @author larsw84/convinced
 */

var FoxtrickHideManagerAvatarUserInfo = {

	MODULE_NAME : "HideManagerAvatarUserInfo",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	DEFAULT_ENABLED : false
};



//**********************************************************
/**
 * forumadddefaultfacecard.js
 * Foxtrick Add default faceCard module
 * @author larsw84
 */

var FoxtrickAddDefaultFaceCard = {

	MODULE_NAME : "AddDefaultFaceCard",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	DEFAULT_ENABLED : true
};


/**
* forumalltidflags.js
* Foxtrick Show Alltid flags in forum posts module
* @author convinced
*/

//**********************************************************
var FoxtrickAlltidFlags = {

	MODULE_NAME : "AlltidFlags",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread")
};
