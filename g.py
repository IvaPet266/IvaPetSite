import json

authors = dict()
with open('posts.json', 'rb') as file:
    data = json.load(file)
    # print(data)

for key in data:
    if authors.get(data[key]["author"]) == None:
        authors[data[key]["author"]] = list()
    authors[data[key]["author"]].append(key)

print(authors)

server_link = "https://storage.yandexcloud.net/ivacite/server/"
authors_key = "server/authors.json"
posts_key = "server/posts.json"
images_link = "https://storage.yandexcloud.net/ivacite/server/images/"

a = dict()

for i in range(len(authors.keys())):
    a[i] = { list(authors.keys())[i]: authors[list(authors.keys())[i]] }

print(a)

with open("authors.json", 'w') as file:
    json.dump(a, file)

s = {
    'WraithFrost88': ['0'], 'HunterGiant5': ['1'], 'BladeTitan98': ['2'], 'IronByte42': ['3'], 'FangTitan80': ['4'], 'GhostSolar94': ['5'],
    'FalconFrost40': ['6'], 'EagleBlaze96': ['7'], 'GhostSteel27': ['8'], 'GoldenEcho62': ['9'], 'SerpentSpecter56': ['10'], 
    'GoldenSolar60': ['11'], 'GhostShadow23': ['12'], 'InfernoFox29': ['13'], 'FangClaw99': ['14'], 'ViperVenom78': ['15'], 
    'HunterHunter73': ['16'], 'CyberCyber89': ['17'], 'ObsidianWolf94': ['18'], 'HawkGiant4': ['19'], 'ViperObsidian16': ['20'], 
    'FangGhost3': ['21'], 'DragonNight79': ['22'], 'WraithReaper3': ['23'], 'WalkerLunar67': ['24'], 'PhantomOwl94': ['25'], 
    'IronWalker3': ['26'], 'ViperStalker54': ['27'], 'ShadowWalker62': ['28'], 'WalkerFrost9': ['29'], 'TitanGolden14': ['30'], 
    'EagleTitan95': ['31'], 'RiderArctic90': ['32'], 'StalkerFang44': ['33'], 'LunarDragon26': ['34'], 'NeonStalker4': ['35'], 
    'OwlStrike97': ['36'], 'ReaperIron9': ['37'], 'WraithClaw85': ['38'], 'ObsidianCrimson46': ['39'], 'EagleThunder49': ['40'], 
    'NeonFox61': ['41'], 'HoundHawk21': ['42'], 'GiantFlare42': ['43'], 'WraithBlade88': ['44'], 'MysticShadow37': ['45'], 
    'NeonHawk18': ['46'], 'HunterHawk53': ['47'], 'FalconViper7': ['48'], 'ClawLunar95': ['49'], 'BladePhoenix84': ['50'], 
    'FoxStrike45': ['51'], 'DragonWalker69': ['52'], 'ArcticHound55': ['53'], 'ViperOwl62': ['54'], 'WraithArctic17': ['55'], 
    'ByteHound48': ['56'], 'ReaperSteel50': ['57'], 'EagleGhost60': ['58'], 'BlazeEcho86': ['59'], 'DragonBlaze94': ['60'], 
    'ObsidianVenom56': ['61'], 'FoxSteel65': ['62'], 'ReaperReaper40': ['63'], 'EchoEagle12': ['64'], 'NeonWolf93': ['65'], 
    'ArcticSolar71': ['66'], 'SilverThunder17': ['67'], 'SilverClaw31': ['68'], 'VenomCrimson22': ['69'], 'ViperSpecter56': ['70'], 
    'CyberInferno72': ['71'], 'WolfNeon33': ['72'], 'LunarGhost57': ['73'], 'TitanFang41': ['74'], 'StormStalker65': ['75'], 
    'SerpentNight97': ['76'], 'FalconEcho93': ['77'], 'SolarSilver55': ['78'], 'HunterWraith38': ['79'], 'StalkerDragon18': ['80'], 
    'PhoenixDragon64': ['81'], 'TitanWolf42': ['82'], 'PhantomDragon9': ['83'], 'BladeSolar80': ['84'], 'InfernoHunter81': ['85'], 
    'ReaperFrost68': ['86'], 'ShadowDark49': ['87'], 'ClawDragon29': ['88'], 'ClawCyber52': ['89'], 'OwlCrimson90': ['90'], 
    'StormHound71': ['91'], 'PhantomReaper58': ['92'], 'StalkerFalcon46': ['93'], 'ReaperSpecter25': ['94'], 'WolfFalcon7': ['95'], 
    'ThunderHound79': ['96'], 'SilverHunter17': ['97'], 'DragonStorm16': ['98'], 'PhantomFox17': ['99'], 'ViperThunder18': ['100'], 
    'OwlThunder24': ['101'], 'ReaperFang74': ['102'], 'LunarSilver34': ['103'], 'ByteDragon18': ['104'], 'FoxFang56': ['105'], 
    'GoldenByte45': ['106'], 'SerpentPhantom30': ['107'], 'SteelThunder12': ['108'], 'ViperHunter85': ['109'], 'PhantomNight29': ['110'], 
    'GiantPhantom83': ['111'], 'WalkerFrost22': ['112'], 'FangVenom12': ['113'], 'FrostStalker99': ['114'], 'IronEagle33': ['115'], 
    'FalconFox16': ['116'], 'GiantBlade1': ['117'], 'PhantomIron10': ['118'], 'StormHunter76': ['119'], 'FlareGiant78': ['120'], 
    'NeonArctic14': ['121'], 'PhantomReaper66': ['122'], 'FlareFrost1': ['123'], 'StrikeRaven11': ['124'], 'FlareReaper95': ['125'], 
    'OwlRaven28': ['126'], 'GhostStalker65': ['127'], 'NightViper89': ['128'], 'NightFalcon39': ['129'], 'ReaperReaper49': ['130'], 
    'ObsidianFrost78': ['131'], 'FangFox30': ['132'], 'VenomObsidian82': ['133'], 'FrostStrike9': ['134'], 'TitanPhantom70': ['135'], 
    'InfernoShadow69': ['136'], 'MysticFox9': ['137'], 'CrimsonOwl5': ['138'], 'StalkerSpecter20': ['139'], 'EchoEcho41': ['140'], 
    'HoundStrike87': ['141'], 'SteelThunder9': ['142'], 'BladeMystic76': ['143'], 'FoxShadow14': ['144'], 'StrikeFrost27': ['145'], 
    'WalkerInferno26': ['146'], 'PhantomSpecter80': ['147'], 'HunterBlade93': ['148'], 'StalkerFalcon100': ['149'], 'GoldenTitan4': ['150'], 
    'StrikeHawk25': ['151'], 'DragonRider37': ['152'], 'LunarNeon82': ['153'], 'EagleReaper16': ['154'], 'InfernoFox75': ['155'], 
    'FoxStalker35': ['156'], 'WraithNight25': ['157'], 'ViperGiant62': ['158'], 'SilverClaw67': ['159'], 'GiantEcho52': ['160'], 
    'ViperFalcon53': ['161'], 'CyberFalcon3': ['162'], 'StrikeViper25': ['163'], 'ByteGolden30': ['164'], 'MysticBlade55': ['165'], 
    'RiderBlaze51': ['166'], 'RavenLunar29': ['167'], 'IronByte14': ['168'], 'GiantStorm48': ['169'], 'NightFang30': ['170'], 
    'TitanWraith77': ['171'], 'DarkLunar20': ['172'], 'TitanViper75': ['173'], 'ClawWolf61': ['174'], 'RavenHound60': ['175'], 
    'HoundPhoenix38': ['176'], 'SilverDark77': ['177'], 'StrikeWalker29': ['178'], 'CrimsonThunder26': ['179'], 'SteelWraith79': ['180'], 
    'BlazeDark80': ['181'], 'GiantDark78': ['182'], 'OwlDark98': ['183'], 'StrikeWraith89': ['184'], 'FalconMystic49': ['185'], 
    'IronStalker18': ['186'], 'StalkerSerpent15': ['187'], 'ClawBlade15': ['188'], 'ShadowGiant51': ['189'], 'ArcticFalcon33': ['190'], 
    'MysticWraith91': ['191'], 'RavenInferno83': ['192'], 'EchoObsidian83': ['193'], 'EagleNight25': ['194'], 'RavenHound56': ['195'], 
    'ArcticIron27': ['196'], 'BladeOwl69': ['197'], 'NeonWraith14': ['198'], 'HoundGolden20': ['199']}