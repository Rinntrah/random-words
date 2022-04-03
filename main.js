

function FindEntriesWhichLeadToFragment(fragmentLowerWithoutHtmlExtension) {
    /*
     fragmentLowerWithoutHtmlExtension = fragmentLowerWithoutHtmlExtension.toLowerCase();
     
     //TREE_MAP
     //a/b/c/seven
     
     //let xd = FILE_NAME_TO_FRAGMENT_NAME[fragmentDotHtmlLowerCase];
     let found=[]
     
     for (const [key, value] of Object.entries(TREE_MAP)) {
     let valueSplit = value.split("/")
     let lastFromSplit = valueSplit[valueSplit.length-1]
     
     if(lastFromSplit==fragmentLowerWithoutHtmlExtension){
     
     found.push(key);//something.html is key
     }
     }*/

    return [];
}

//let found=FindEntriesWhichLeadToFragment("seven");
//alert(found)
//var currentFileNameDotHTML = location.href.split("/").slice(-1)

function GetCurrentFileNameDotHTML() {
	document.getElementById("DEBUG_DIV").style.display = "none"
	
  
	
	let alt_fragname_from_debug_info = document.getElementById("file_name").innerHTML;
	return alt_fragname_from_debug_info;

    return alt_fragname_from_debug_info;
}

function GetCurrentFileNameWITHOUTDotHTML() {
    var currentFileNameDotHTML = ("" + GetCurrentFileNameDotHTML()).split(".html")[0]
    return currentFileNameDotHTML;
}

function GetFragmentNameFromCurrentHTMLFile() {//returns without html extension zwraca:what the sailor says jesli aktualny=whatthesailorsays.html
    var currentFileNameDotHTML = location.href.split("/").slice(-1)
    let last = FILE_NAME_TO_FRAGMENT_NAME[currentFileNameDotHTML.toString().toLowerCase()]
    return last;
}


var currentFileNameDotHTML = GetCurrentFileNameDotHTML();


function GetFragmentPathSplittedAndCorrected() {
    var SPLITTED = TREE_MAP[currentFileNameDotHTML].split('/')
    var SPLITTED_CORRECTED = []	//fragment names for currently opened fragment

    for (var i = 0; i < SPLITTED.length; i++) {
        var what = SPLITTED[i] + ".html";


        SPLITTED_CORRECTED[i] = FILE_NAME_TO_FRAGMENT_NAME[what.toString().toLowerCase()]
        SPLITTED[i] = SPLITTED[i].toLowerCase()
    }

    return SPLITTED_CORRECTED;
}

function GetSplittedAndCorrectedHTMLNames() {
    var SPLITTED = TREE_MAP[currentFileNameDotHTML].split('/')
    var SPLITTED_CORRECTED_HTML_NAMES = []	//names of html files for above array of fragment names


    for (var i = 0; i < SPLITTED.length; i++) {
        var what = SPLITTED[i] + ".html";

        SPLITTED_CORRECTED_HTML_NAMES[i] = what

        SPLITTED[i] = SPLITTED[i].toLowerCase()
    }

    SPLITTED_CORRECTED_HTML_NAMES.push(currentFileNameDotHTML);
    return SPLITTED_CORRECTED_HTML_NAMES;
}

//SPLITTED_CORRECTED = GetFragmentPathSplittedAndCorrected()
//SPLITTED_CORRECTED_HTML_NAMES = GetSplittedAndCorrectedHTMLNames()

//document.getElementById("DEBUG_FRAGMENT_PATH").innerHTML = SPLITTED_CORRECTED.toString().replaceAll(","," / ");
//document.getElementById("DEBUG_FRAGMENT_PATHS").innerHTML = SPLITTED_CORRECTED_HTML_NAMES.toString().replaceAll(","," / ");

//document.getElementById("DEBUG_OTHER").innerHTML += "TREE_MAP:" + TREE_MAP.keys;
//breadcrumb




//var SPLITTED_CORRECTED = ["a","b","c"];

function MakeBreadCrumb() {
    //var PARENT_PATHHH=FindParentPathFromFileName(CurrentFileName())
    //var SPLITTED_CORRECTED = PARENT_PATHHH.toString().replace(".html","").split("\\");
    let abc = FindParentPathFromFileName(CurrentFileName());

    if (CurrentFileName() == "here.html") {

        abc = "here";
    }

    if (!abc) {
        alert("current file name deducted:" + CurrentFileName() + "; can't find parent path in tree.js for this fragment");
        return;
    }

    let SPLITTED_CORRECTED = abc.split("/")
    console.log("breadcrumb: SPLITTED_CORRECTED:" + SPLITTED_CORRECTED);

    //alert(SPLITTED_CORRECTED)
    document.getElementById("<ul>_of_breadcrumb").innerHTML = "";




    if (abc == "root" || abc == "root.html") {
        return;
    }

    for (var i = 0; i < SPLITTED_CORRECTED.length; i++) {
        let isFirstFragment = i == 0;
        let isLastFragment = i == (SPLITTED_CORRECTED.length - 1);

        let fragmentNameNow = SPLITTED_CORRECTED[i] + ".html";
        fragmentNameNow = FILE_NAME_TO_FRAGMENT_NAME[fragmentNameNow];

        let lastLI = null;
        let lastA = null;

        function makeAndAppend_A(appendSpan) {
            let _UL = document.getElementById("<ul>_of_breadcrumb")
            let _LI = document.createElement('li');
            _LI.className += "breadcrumb-li";

            let _A = document.createElement('a');
            _A.text = "" + fragmentNameNow + "";
            _A.href = (SPLITTED_CORRECTED[i] + ".html").toString().toLowerCase();

            _LI.appendChild(_A);//add <a> to <li>
            _UL.appendChild(_LI)//add <li> to <ul>

            if (appendSpan) {
                //append li with span
                let _LI = document.createElement('li');
                let _SPAN = document.createElement('span');
                _SPAN.className += " breadcrumb-span";
                _UL.appendChild(_SPAN);//add <li> with span to <ul>
                _SPAN.innerHTML = "/";
            }

            lastLI = _LI;
            lastA = _A;
            return _A;
        }

        makeAndAppend_A(true);

        if (isFirstFragment) {
            lastLI.className += " breadcrumb-first";
        }

        if (isLastFragment) {
            let _A = makeAndAppend_A(false);
            lastLI.className += " breadcrumb-current";
            let g = htmlFileNameToFragmentName(CurrentFileName());
            _A.text = g;
            if (g == null) {
                _A.text = CurrentFileName() + "(missing file to fragment name translation)";
            }
        }

    }
}

MakeBreadCrumb();

var correspondingHref_to_enter_on_enter_pressed = null;


function onEnterPress(e) {
    let abc = GetCurrentFileNameDotHTML();


    if (e == 13 && abc == "after.html") {
        //after.html -> go to random fragment
        let randomFragment = all_files_for_after_dot_html[Math.floor(Math.random() * all_files_for_after_dot_html.length)];
        document.location = "" + randomFragment;

        return;
    }
    //ourstorysofar.html dziala poprawnie poprzez rl oraz q
    let q = GUARDS[abc];

    if (!q) {

        //jeśli guard jest pusty to wyszukaj href0 z hrefs i idź tam(do default linku)
        let hrefs = FRAGMENT_HREFS[GetCurrentFileNameDotHTML()];
		
        if (!hrefs[0]) {
            bleep();//nie ma guarda ORAZ nie ma href0, robimy bleep i nie robimy nic
            return;
        } else {
            //nie ma guarda ORAZ JEST  href0, przenosimy
            if (hrefs[0] == "#") {
                //otwórz link menu, gdy href0 to jest "#"
                ShowLinkListWindow();
                bleep();

            } else {
                document.location = "" + hrefs[0];
            }
            return;
        }


        bleep();
        return;
    }
    console.log("guard for this fragment q=" + q);

    if (q == null || !q) {
        return;
    }
    ;
    let qEvalResult = Number(eval(q));//tu jest indeks(liczba), odnosząca się do fragmentu w hrefs.js
    let hrefs = FRAGMENT_HREFS[GetCurrentFileNameDotHTML()];

    correspondingHref_to_enter_on_enter_pressed = hrefs[qEvalResult];
    console.log("correspondingHref for guard result(which was href" + qEvalResult + ") is:" + correspondingHref_to_enter_on_enter_pressed);

    if (e == 13) {
        if (typeof correspondingHref_to_enter_on_enter_pressed !== 'undefined' && correspondingHref_to_enter_on_enter_pressed != null) {
            document.location = "" + correspondingHref_to_enter_on_enter_pressed;
        } else {
            bleep();
        }
    }
}
function setDefaultLinkUnderEnter() {

    //ON ENTER
    document.onkeypress = function (e) {
        e = window.event ? event : e;
        e = e.charCode ? e.charCode : e.keyCode;
        onEnterPress(e);
    }
	
	
}

var all_files_for_after_dot_html = ['-30-.html', '1.html', '11.html', '12.html', '13.html', '14.html', '1955.html', '1982.html', '1calliopeatmarathon.html', '2.html', '22shortfilmsrerpower.html', '2timesgeometry.html', '3.html', '3johan.html', '4.html', '4annam.html', '5.html', '5worldsedge.html', '6continental.html', '7.html', '720.html', '8.html', 'Rozespana.html', 'a.html', 'A_.html', 'a_hypertext.html', 'abeginning.html', 'acallfrombelow.html', 'actionandpassion.html', 'adeath.html', 'aerver.html', 'after.html', 'akeyquestion.html', 'alaxalasalass.html', 'aleagueofnations.html', 'allhumanwisdom.html', 'alone.html', 'aloversdiscourse.html', 'anaside.html', 'anchoringdevices.html', 'and.html', 'andshouldhavewonit.html', 'andwatson.html', 'andwhere.html', 'anescaperoute.html', 'anotherhouse.html', 'anthem.html', 'aphoto.html', 'apoetafloat.html', 'apositiveid.html', 'aprilewaltera.html', 'archangel.html', 'areporterreflects.html', 'aretreatingfigure.html', 'ariddleman.html', 'asasillyman.html', 'asiflightspoke.html', 'asinisteract.html', 'asong.html', 'aspittinimage.html', 'asuspect.html', 'aswan.html', 'asylum.html', 'autumnalwalkings.html', 'awayout.html', 'backstory.html', 'bazaar.html', 'belowanoldmountain.html', 'biomass.html', 'birdsweave.html', 'blacktalk.html', 'blue.html', 'blueboat-city.html', 'boat.html', 'boytake.html', 'butter.html', 'byitscover.html', 'caring.html', 'caught--continued.html', 'caught.html', 'caughtagain.html', 'cave.html', 'centmilledefacts.html', 'certaincertainties.html', 'che.html', 'chronicle.html', 'chryalis.html', 'cixous.html', 'comingtowriting.html', 'command.html', 'command_001.html', 'command_002.html', 'command_003.html', 'command_1.html', 'command_2.html', 'command_3.html', 'concealedbirds.html', 'cosifantutte.html', 'couplet.html', 'couplet_1.html', 'courses.html', 'courting.html', 'crossexamination.html', 'dalaiinthesky.html', 'damndearbloombloor.html', 'daniche.html', 'daniel.html', 'dateline.html', 'dateline_1.html', 'dateline_2.html', 'dautunno.html', 'dazeofthewoke.html', 'dialectic.html', 'dickshunairy.html', 'distanttenderness.html', 'doeshenrysee.html', 'drowsy.html', 'duringthehypertext198.html', 'easewhybother.html', 'echolalia.html', 'eddornseyes.html', 'editedout.html', 'eerjordan.html', 'electric.html', 'elf.html', 'elkid.html', 'elorgua.html', 'ems.html', 'endone.html', 'englishtextbybruce.html', 'essencily.html', 'etcheditself.html', 'eveningstar.html', 'everyones.html', 'everyonetriesnottobe.html', 'eyes.html', 'failus.html', 'father.html', 'father_1.html', 'fidelity.html', 'fifthekphrastic.html', 'firstekphrastic.html', 'fiveelements.html', 'fourhorsemen.html', 'fourthekphrastic.html', 'francoisgirards.html', 'fredandbarney.html', 'freewill.html', 'freshessai.html', 'fustytu.html', 'garments.html', 'genesis.html', 'gettingitdown.html', 'ghislaineguertin.html', 'glennbarrett.html', 'gnosis.html', 'goldbugs.html', 'greyday.html', 'gs.html', 'heaintheavy.html', 'heatwavechangeofpace.html', 'heights.html', 'hensandchicks.html', 'heprotesteth.html', 'here.html', 'hestirs-obie.html', 'hewakes.html', 'hi-pitchedvoices.html', 'hishopes.html', 'history.html', 'hj.html', 'hj2.html', 'housahoser.html', 'howhesleeps.html', 'howthingshappen-guns.html', 'huh.html', 'iceman.html', 'ideograms.html', 'idyllicthey.html', 'iknownotsees.html', 'ikons.html', 'illegalthey.html', 'immigranttothisshore.html', 'inahalf-hiddencave.html', 'inlightonlight.html', 'inpursuitofyo.html', 'input.html', 'interrogationinterra.html', 'inthedisclosuresof.html', 'inthehigherair.html', 'intimenightall-1.html', 'intimenightall.html', 'inwhichhe.html', 'itbeginssomewhere.html', 'itistothee.html', 'iwasntevenguiltyof.html', 'ja.html', 'justlikelife.html', 'justus.html', 'justwheretheriver.html', 'keywest.html', 'lacrise.html', 'lake-memory.html', 'laundrydonebeautiful.html', 'leeryabandonnedchild.html', 'lesheurs.html', 'lettureimpalpabili.html', 'lifeinabox.html', 'lights.html', 'littlegedditing.html', 'livingstill.html', 'looknow--obie.html', 'lurchesfromitsmouth.html', 'manofaction.html', 'mars.html', 'meaning.html', 'mechanicalquip.html', 'memory.html', 'michael.html', 'michaelcentury.html', 'mickhammer.html', 'modernmanandbaby.html', 'moredogons.html', 'morning.html', 'mother.html', 'motherlandfathertongue.html', 'mouths-world.html', 'multilingual.html', 'myfathersroom.html', 'myself.html', 'naturaleloquence.html', 'nearly.html', 'newday.html', 'nightswork.html', 'node.html', 'noonecared.html', 'noons.html', 'notes _2.html', 'notes.html', 'notsomuch.html', 'nousnote.html', 'nuclearfishing.html', 'obiesmouth-truth.html', 'obieswathed.html', 'observatory.html', 'occidental.html', 'ohbravenewworld.html', 'onpineneedles.html', 'operatingsystem.html', 'oreallyo.html', 'oulipo.html', 'ours.html', 'ourstorysofar-test.html', 'ourstorysofar.html', 'outerspace.html', 'outofmemory.html', 'outofrhythm.html', 'pandoralaura.html', 'parable.html', 'parry.html', 'partfour.html', 'pasadena.html', 'passages.html', 'phaedrus.html', 'phantom.html', 'piano.html', 'pianos.html', 'pleasantlake.html', 'pleasures.html', 'portraitoftheartist.html', 'postcardtoher.html', 'prophet.html', 'prospects.html', 'protagonistes.html', 'protector.html', 'q.html', 'query.html', 'readingstoryspaces-1.html', 'readingstoryspaces-pl.html', 'readingstoryspaces.html', 'realm.html', 'reignsinadrytime.html', 'reineofhearts.html', 'repaying.html', 'rest-s.html', 'riddle.html', 'riding.html', 'river.html', 'roundususuallsuspects.html', 'saltorchopinin6.html', 'sam.html', 'savaissabrett.html', 'scent.html', 'scrimshaw.html', 'scrimshawsalibi.html', 'seas.html', 'seaside.html', 'secondekphrastic.html', 'seesee.html', 'seeside.html', 'seizethedj.html', 'september.html', 'servicemarks.html', 'seven.html', 'severity.html', 'shadowhappiness.html', 'shid.html', 'six.html', 'sleepy.html', 'sleepysong.html', 'soiwroteacolumn.html', 'somefalseleads.html', 'somesay.html', 'sometimesdawn.html', 'son.html', 'son_1.html', 'son_2.html', 'sonata.html', 'songs.html', 'soon.html', 'sorrows.html', 'sosinkstheday-star.html', 'speech.html', 'spelt.html', 'springsprung.html', 'start.html', 'stepone.html', 'stories.html', 'suit.html', 'suitcasememory.html', 'surrender.html', 'suspicions.html', 'sweaters.html', 'takenbythecontinual.html', 'tapes56.html', 'tegvara.html', 'tempofuggechetassonna.html', 'tempsvierge.html', 'theend.html', 'theendofthecoldwar.html', 'thekindofmanwho.html', 'themeaning.html', 'theoldmanandthesee.html', 'there.html', 'thesailorread.html', 'thetruth.html', 'thirdekphrastic.html', 'thiscomputer.html', 'times.html', 'tiredofpomo.html', 'toher-perspective.html', 'totheleftof.html', 'towersinair.html', 'towhatend.html', 'transformation.html', 'transmogrifikey.html', 'transubstantiate.html', 'twilight.html', 'two.html', 'twom.html', 'twos.html', 'uponoppositeshores.html', 'versusthetermination.html', 'vivailpapa.html', 'waterglinting.html', 'weoftenfelt.html', 'whathappenedtous.html', 'whathappens.html', 'whatsinkswhatrises.html', 'whatthesailorsays.html', 'wheretheblacknesslaps-1.html', 'wheretheblacknesslaps.html', 'whereweeblong.html', 'whether.html', 'whetherreport.html', 'who.html', 'whosaidwhat.html', 'whosthestoolie.html', 'wisdom.html', 'wolflake.html', 'wonders.html', 'workplay.html', 'worldnoises.html', 'yoda.html', 'youllsees.html', 'yourstruly.html'];


//=====
setDefaultLinkUnderEnter()

//<li><a href="#">Folder nadrzędny</a></li>
//<li><span class="mx-2">></span></li>
//<li class="active">Element Aktualny</li>

document.getElementById("DEBUG_DIV").style.display = "none"
//document.getElementById("link_out").style.display="none"
//document.getElementById("link_in").style.display="none"

//document.get

let navlinkbuttons = document.getElementsByClassName("nav-link default-nav")
//navlinkbuttons[0].innerHTML="1234141";
navlinkbuttons[0].href = "javascript:void(0)";//Disable HTML anchor with inline JavaScript

navlinkbuttons[0].onclick = function () {
    onEnterPress(13)
}

//ForwardButton.onclick = function () {
//
//    alert('OnClick!')
//
//};
//let abab="alert('eval rezult:'+1+1)";
//eval(abab)

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "fragment_to_audio_map.js";
document.body.appendChild(script);





