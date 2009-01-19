/*
 * modules_list.js
 */
////////////////////////////////////////////////////////////////////////////////
 /** Modules that need to be initialized and register their page handlers
 * in the beginning.
 * Each should implement an init() method, which will be called only once.
 * Register your page handlers in it.
 */
Foxtrick.modules = [ 
                     FoxtrickFixcssProblems,
                     FoxtrickForumTemplates,
                     FoxtrickForumPreview,
                     FoxtrickForumYouthIcons,
                     BookmarkAdjust,
                     FoxtrickHideManagerAvatar,
                     FoxtrickAddDefaultFaceCard,
                     FoxtrickMoveLinks,
                     FoxtrickAlltidFlags,  // keep before FoxtrickHideManagerAvatarUserInfo
					 FoxtrickHideManagerAvatarUserInfo,
                     FoxtrickGoToPostBox,
					 FoxtrickCopyPostID,  
                     FoxtrickForumStaffMarker,
                     FoxtrickHTThreadMarker,
                     FoxtrickMedianTransferPrice,
                     FoxtrickYouthSkillNotes,
                     FoxtrickAddLeaveConfButton,
                     FoxtrickFlipSidesInMatchOrders,
                     FoxtrickStarsCounter,
                     FoxtrickRepositionedPlayers,
                     FoxtrickAdvancedStarsCounter,
                     FoxtrickFormationBoxInMatchOrders,
                     FoxtrickFlagCollectionToMap,
                     FoxtrickTransferListSearchFilters,
                     FoxtrickTransferListDeadline,
                     FoxtrickHTDateFormat,
                     FoxtrickExtendedPlayerDetails,
                     FoxtrickTeamPopupLinks,
					 FoxtrickMatchPlayerColouring,
                     AttVsDef, // AttVsDef should be placed before Ratings
					 Ratings,
                     FoxtrickAlert,
                     FoxtrickHideFaceTransferImages,
                     FoxtrickHideFaceInjuryImages,
                     FoxtrickHideFaceSuspendedImages,
                     FoxtrickColouredYouthFaces,
					 FoxtrickPlayerAdToClipboard,
                     FoxtrickLinksCustom,
                     FoxtrickLinksLeague,
                     FoxtrickLinksCountry,
                     FoxtrickLinksTeam,
                     FoxtrickLinksChallenges,
                     FoxtrickLinksEconomy,
                     FoxtrickLinksYouthOverview,
                     FoxtrickLinksArena,
                     FoxtrickLinksCoach,
                     FoxtrickLinksPlayerDetail,
                     FoxtrickLinksMatch,
                     FoxtrickLinksTraining,
					 FoxtrickLinksAlliances,
					 FoxtrickLinksNational,
                     FoxtrickAddManagerButtons,
                     FoxtrickTruncateLongNicks,
                     FoxtrickConfirmPlayerBid,
					 FoxtrickConfirmTL,
                     FoxtrickEconomyDifference,
                     FoxtrickHideSignatures,
                     FoxtrickForumNextAndPrevious,
                     FoxtrickPersonalityImages,
                     FoxtrickSkillColoring,
                     //FoxtrickSkinPlugin,
					 FoxtrickHelper,
					 FTTeamStats,
					 FoxtrickLargeFlags,
					 FoxtrickTeamSelectBox,
					 FoxtrickSeniorTeamShortCuts,
					 FoxtrickCustomMedals,
					 FoxtrickForumRedirManagerToTeam,					 
                   ];
