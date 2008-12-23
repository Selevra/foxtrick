/**
 * showmessagebutton.js
 * Foxtrick Leave Conference module
 * @author larsw84
 */

 ////////////////////////////////////////////////////////////////////////////////
var FoxtrickShowMessageButton = {

    MODULE_NAME : "ShowMessageButton",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	DEFAULT_ENABLED : true,

    init : function() {
            Foxtrick.registerPageHandler( 'managerPage',
                                          FoxtrickShowMessageButton );
			Foxtrick.registerPageHandler( 'teamPage',
                                          FoxtrickShowMessageButton );
    },
    
    run : function( page, doc ) {
		
		switch( page ) {
			case 'managerPage':

				var allDivs = doc.getElementsByTagName("div");
				var teamID;
				var ownerID;
				
				// Get the teamID
				for(var i = 0; i < allDivs.length; i++) {
					//Retrieve owner manager ID - Stephan
					if(allDivs[i].id=="teamLinks") {
						var teamLinks_a = allDivs[i].
							getElementsByTagName("a")[0];
						ownerID = teamLinks_a.href.substr(teamLinks_a.href.search(/TeamID=/i)+7);
					}
					if(allDivs[i].className=="main mainRegular") {
						var divBoxHead = allDivs[i].
							getElementsByTagName("div")[0];
						var divBoxLeft = divBoxHead.
									getElementsByTagName("div")[0];
						var header = divBoxLeft.getElementsByTagName("h2")[0];
						var a = header.getElementsByTagName("a")[0];
						teamID = a.href.substr(a.href.search(/TeamID=/i)+7);
					}
				}
			
				//Do not add send message button for owner manager page. - Stephan
				if (ownerID==teamID) return;
				
				var messageLink = doc.createElement("a");
				messageLink.className = "inner";
				messageLink.href = "../?TeamID=" + teamID + 
					"&SendMessage=true";
				messageLink.title = Foxtrickl10n.getString( 
					"foxtrick.tweaks.sendmessage" );
				
				var img = doc.createElement("img");
				img.className = "actionIcon";
				img.alt = Foxtrickl10n.getString( "foxtrick.tweaks.sendmessage" );
				img.src = "/App_Themes/Standard/images/ActionIcons/mail.png";
				messageLink.appendChild(img);
				
				// Append the box to the sidebar
				Foxtrick.addBoxToSidebar( doc, Foxtrickl10n.getString( 
					"foxtrick.tweaks.actions" ), messageLink, "first");
				break;
				
			case 'teamPage':
				var sUrl = Foxtrick.getHref( doc );
				var sendPos = sUrl.search(/&SendMessage=true/i);
				if (sendPos > -1){
					var a = doc.getElementById('ctl00_CPSidebar_ucVisitorActions_lnkMail');
					var divMessage = doc.getElementById('ctl00_CPSidebar_ucVisitorActions_pnlMessage');
					if (a && !divMessage){
						// don't execute when the send message box is already there
						var func = a.href;
						if (func){
							doc.location.href = func;
						}
					}
				}
				break;
		}
	}
};

/*
 * The following code was an attempt to create a Send Message form on the Manager page.
 * The code in the end was a failure: after clicking 'Send' in the form, Hattrick would
 * display an Application Error.
 * I'm going to shelve this attempt until further notice, but if I ever try again, this code
 * will be a good start. So please don't delete! But don't use it either :)
 * /larsw84 19-12-2008
				
				Foxtrick.addJavaScript(doc, "chrome://foxtrick/content/resources/js/"
					+"common.js");
				//var aspnetForm = doc.getElementById("aspnetForm");
				var allDivs = doc.getElementsByTagName("div");
				var teamID;
				
				// Get the teamID
				for(var i = 0; i < allDivs.length; i++) {
					if(allDivs[i].className=="main mainRegular") {
						var divBoxHead = allDivs[i].
							getElementsByTagName("div")[0];
						var divBoxLeft = divBoxHead.
									getElementsByTagName("div")[0];
						var header = divBoxLeft.getElementsByTagName("h2")[0];
						var a = header.getElementsByTagName("a")[0];
						teamID = a.href.substr(a.href.search(/TeamID=/i)+7);
					}
				}
				
				// Make sure the right action is executed
				//aspnetForm.setAttribute("action","../Default.aspx?TeamID="
				//	+ teamID);
				
				// Create the message form
				var ownDiv = doc.createElement("div");
				ownDiv.setAttribute("id","ctl00_CPSidebar_ucVisitorActions"
					+"_UpdatePanel1");
				var ownSidebarBox = doc.createElement("div");
				ownSidebarBox.className = "sidebarBox";
				ownDiv.appendChild(ownSidebarBox);
				var ownBoxHead = doc.createElement("div");
				ownBoxHead.className = "boxHead";
				ownSidebarBox.appendChild(ownBoxHead);
				var ownBoxLeftHeader = doc.createElement("div");
				ownBoxLeftHeader.className = "boxLeft";
				ownBoxHead.appendChild(ownBoxLeftHeader);
				var ownHeader = doc.createElement("h2");
				ownHeader.innerHTML = "Send message";
				ownBoxLeftHeader.appendChild(ownHeader);
				var ownBoxBody = doc.createElement("div");
				ownBoxBody.className = "boxBody";
				ownSidebarBox.appendChild(ownBoxBody);
				var messageDiv = doc.createElement("div");
				messageDiv.setAttribute("id","ctl00_CPSidebar_"
					+ "ucVisitorActions_pnlMessage");
				messageDiv.innerHTML = "<b> Subject</b><br/><input id=\"ctl00_"
					+ "CPSidebar_ucVisitorActions_txtSubject\" type=\"text\""
					+ "tabindex=\"1\" maxlength=\"50\" name=\"ctl00$CPSidebar"
					+ "$ucVisitorActions$txtSubject\"/><textarea id=\"ctl00_"
					+ "CPSidebar_ucVisitorActions_txtMessage\" onkeyup=\""
					+ "textCounter(ctl00_CPSidebar_ucVisitorActions_txtMessage"
					+ ", ctl00_CPSidebar_ucVisitorActions_txtCharsLeft, 1000)"
					+ "\"onkeydown=\"textCounter(ctl00_CPSidebar_ucVisitor"
					+ "Actions_txtMessage, ctl00_CPSidebar_ucVisitorActions_"
					+ "txtCharsLeft, 1000)\" tabindex=\"2\" cols=\"20\" rows="
					+ "\"5\" name=\"ctl00$CPSidebar$ucVisitorActions$"
					+ "txtMessage\"></textarea><br/><input id=\"ctl00_CPSideba"
					+ "r_ucVisitorActions_txtCharsLeft\" type=\"text\" style="
					+ "\"width: 40px;\" readonly=\"readonly\" value=\"1000\""
					+ "name=\"ctl00$CPSidebar$ucVisitorActions$txtCharsLeft\""
					+ "/><br/><input id=\"ctl00_CPSidebar_ucVisitorActions_"
					+ "btnSend\" type=\"submit\" tabindex=\"3\" value=\"send\""
					+ "name=\"ctl00$CPSidebar$ucVisitorActions$btnSend\"\/>"
					+ "</div>";
				ownBoxBody.appendChild(messageDiv);
				var ownBoxFooter = doc.createElement("div");
				ownBoxFooter.className = "boxFooter";
				ownSidebarBox.appendChild(ownBoxFooter);
				var ownBoxLeftFooter = doc.createElement("div");
				ownBoxLeftFooter.className = "boxLeft";
				ownBoxLeftFooter.innerHTML = "&nbsp;";			
						
				ownBoxFooter.appendChild(ownBoxLeftFooter);
				// Append the message form to the sidebar
				var sidebar = doc.getElementById("sidebar");
				var firstChild = sidebar.firstChild;
				sidebar.insertBefore(ownDiv,firstChild);
				*/