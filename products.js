
const makeProduct = (id, category, name, actualPrice, pack = "1 Box", netRate = false) => ({
  id: String(id),
  category,
  name,
  actualPrice,
  discountPrice: netRate ? actualPrice : actualPrice * 0.5,
  pack
});

const products = [
  // MULTI SOUND CRACKERS
  makeProduct(1, "Multi Sound Crackers", "Two Sound", 70, "1 Packet"),
  makeProduct(2, "Multi Sound Crackers", "Three Sound Colour Deluxe", 90, "1 Packet"),

  // ROCKETS
  makeProduct(3, "Rockets", "Baby Rocket", 74),
  makeProduct(4, "Rockets", "Colour Rocket", 126),
  makeProduct(5, "Rockets", "Rocket Bomb", 144),
  makeProduct(6, "Rockets", "Lunik Express", 306),
  makeProduct(7, "Rockets", "Two Sound Rocket", 328),
  makeProduct(8, "Rockets", "Echo Rocket Whistling (10 Pcs)", 254),
  makeProduct(9, "Rockets", "Whistling Rocket (5 Pcs)", 178),

  // GROUND CHAKKARS
  makeProduct(10, "Ground Chakkars", "Gr. Chakkars Big (10 Pcs) 10½ inch", 76),
  makeProduct(11, "Ground Chakkars", "Gr. Chakkar Special - 21 inch", 146),
  makeProduct(12, "Ground Chakkars", "Gr. Chakkar Deluxe - 31 inch", 284),
  makeProduct(13, "Ground Chakkars", "Scooty Wheel (5 Pcs)", 200),

  // FLOWER POTS
  makeProduct(14, "Flower Pots", "Flower Pots Small", 110),
  makeProduct(15, "Flower Pots", "Flower Pots Big", 160),
  makeProduct(16, "Flower Pots", "Flower Pots Special", 204),
  makeProduct(17, "Flower Pots", "Flower Pots Asoka", 310),
  makeProduct(18, "Flower Pots", "Flower Pots Deluxe (5 Pcs)", 420),
  makeProduct(19, "Flower Pots", "Colour Koti (10 Pcs)", 580),
  makeProduct(20, "Flower Pots", "Colour Koti (5 Pcs)", 300),
  makeProduct(21, "Flower Pots", "Colour Koti Deluxe", 700),
  makeProduct(22, "Flower Pots", "Multi Colour Giant (10 Pcs)", 606),
  makeProduct(23, "Flower Pots", "Multi Colour Giant (5 Pcs)", 316),
  makeProduct(24, "Flower Pots", "Flower Bomb / Seeta Geeta (5 Pcs)", 166),

  // TORCHES
  makeProduct(25, "Torches", "Magic Pencil - 7", 84),
  makeProduct(26, "Torches", "Bright Deluxe - 10", 176),
  makeProduct(27, "Torches", "Delight Candle - 12", 210),
  makeProduct(28, "Torches", "Navrang Pencil (5 Pcs)", 230),

  // TWINKLING STAR & CARTOONS
  makeProduct(29, "Twinkling Star & Cartoons", "46 Cm Twinkling Star", 66),
  makeProduct(30, "Twinkling Star & Cartoons", "120 Cm Twinkling Star", 164),
  makeProduct(31, "Twinkling Star & Cartoons", "Assorted Cartoons (10 Pcs)", 66),
  makeProduct(32, "Twinkling Star & Cartoons", "Electric Stone (10 Pcs)", 58),
  makeProduct(33, "Twinkling Star & Cartoons", "Emerald (10 Pcs)", 90),

  // ATOM BOMB GREEN
  makeProduct(34, "Atom Bomb Green", "Atom Bomb Big", 110),
  makeProduct(35, "Atom Bomb Green", "Hydro Bomb", 136),
  makeProduct(36, "Atom Bomb Green", "King Kong / Terror Bomb", 200),
  makeProduct(37, "Atom Bomb Green", "Dinosaur Bomb", 320),
  makeProduct(38, "Atom Bomb Green", "Bullet Bomb", 72),

  // FANCY NOVELTIES
  makeProduct(39, "Fancy Novelties", "Siren (2 Pcs)", 400),
  makeProduct(40, "Fancy Novelties", "7 Shots Colour (5 Pcs)", 280),
  makeProduct(41, "Fancy Novelties", "Colour Celebration (5 Pcs)", 372),

  // AERIAL SHOOTERS
  makeProduct(42, "Aerial Shooters", "1 inch Fancy", 80),
  makeProduct(43, "Aerial Shooters", "2 inch Fancy", 240),
  makeProduct(44, "Aerial Shooters", "2 inch Fancy (3 Pcs)", 660),
  makeProduct(45, "Aerial Shooters", "3 inch Fancy (5 Step)", 660),
  makeProduct(46, "Aerial Shooters", "3½ inch Fancy (1 Pce)", 670),
  makeProduct(47, "Aerial Shooters", "4 inch 7 Wonder (7 Steps)", 910),
  makeProduct(48, "Aerial Shooters", "3½ inch Wow Special (Purple/Pink)", 1100),
  makeProduct(49, "Aerial Shooters", "3½ inch Turbo (2 Pcs)", 1500),
  makeProduct(50, "Aerial Shooters", "4 inch Jumbo (2 Pcs)", 1750),
  makeProduct(51, "Aerial Shooters", "5 inch Giga (2 Pcs)", 2030),
  makeProduct(52, "Aerial Shooters", "3½ inch Double Ball (1 Pce)", 1060),

  // FANCY NOVELTIES
  makeProduct(53, "Fancy Novelties", "Tim Tam (Chit Put)", 130),
  makeProduct(54, "Fancy Novelties", "Star Drum (Crackling)", 230),
  makeProduct(55, "Fancy Novelties", "Traffic Light (5 Pcs)", 160),
  makeProduct(56, "Fancy Novelties", "Colour Lights (2 Pcs) / Force", 150),
  makeProduct(57, "Fancy Novelties", "Crush Candle (2 Pcs)", 590),
  makeProduct(58, "Fancy Novelties", "Funky Fish Candle (1 Pce)", 340),
  makeProduct(59, "Fancy Novelties", "Photo Flash (5 Pcs)", 170),
  makeProduct(60, "Fancy Novelties", "Butterfly / Darling Dancer", 220),
  makeProduct(61, "Fancy Novelties", "Peacock", 400),
  makeProduct(62, "Fancy Novelties", "Dancing Peacock (Bada)", 980),
  makeProduct(63, "Fancy Novelties", "Peacock Tail (2 Pcs)", 360),
  makeProduct(64, "Fancy Novelties", "Jasmine Flowers (2 Pcs)", 360),
  makeProduct(65, "Fancy Novelties", "Lolly Pop (3 Pcs)", 310),
  makeProduct(66, "Fancy Novelties", "Dazzle (3 Pcs)", 860),
  makeProduct(67, "Fancy Novelties", "Helicopter (5 Pcs)", 240),
  makeProduct(68, "Fancy Novelties", "Kurkure", 170),
  makeProduct(69, "Fancy Novelties", "Whizz Wheel (5 Pcs)", 220),

  // SMOKE NOVELTIES
  makeProduct(70, "Smoke Novelties", "Colour Smoke (5 Pcs)", 620),

  // MULTI SHOTS
  makeProduct(71, "Multi Shots", "12 Shots", 360),
  makeProduct(72, "Multi Shots", "12 Shots (Crackling)", 480),
  makeProduct(73, "Multi Shots", "Fusion 12 Shot (Whistling)", 620),
  makeProduct(74, "Multi Shots", "Star Night Show - 15 Shots", 618),
  makeProduct(75, "Multi Shots", "25 Shots (Red & Green)", 700),
  makeProduct(76, "Multi Shots", "25 Shots (Crackling)", 800),
  makeProduct(77, "Multi Shots", "Shanghai Trip - 105 Colour Balls", 1090),
  makeProduct(78, "Multi Shots", "15 Shot", 580),
  makeProduct(79, "Multi Shots", "30 Shot", 910),
  makeProduct(80, "Multi Shots", "30 Shot Crackling", 1100),
  makeProduct(81, "Multi Shots", "60 Shot", 1820),
  makeProduct(82, "Multi Shots", "100 Shot", 2800),
  makeProduct(83, "Multi Shots", "120 Shot", 3700),
  makeProduct(84, "Multi Shots", "240 Shot", 7300),

  // SPARKLERS
  makeProduct(85, "Sparklers", "7cm Electric", 20),
  makeProduct(86, "Sparklers", "7cm Colour", 22),
  makeProduct(87, "Sparklers", "7cm Green", 28),
  makeProduct(88, "Sparklers", "7cm Red", 34),
  makeProduct(89, "Sparklers", "10cm Electric", 34),
  makeProduct(90, "Sparklers", "10cm Colour", 38),
  makeProduct(91, "Sparklers", "10cm Green", 40),
  makeProduct(92, "Sparklers", "10cm Red", 44),
  makeProduct(93, "Sparklers", "12cm Electric", 54),
  makeProduct(94, "Sparklers", "12cm Colour", 58),
  makeProduct(95, "Sparklers", "12cm Green", 60),
  makeProduct(96, "Sparklers", "12cm Red", 70),
  makeProduct(97, "Sparklers", "15cm Electric", 84),
  makeProduct(98, "Sparklers", "15cm Colour", 90),
  makeProduct(99, "Sparklers", "15cm Green", 100),
  makeProduct(100, "Sparklers", "15cm Red", 110),
  makeProduct(101, "Sparklers", "30cm Electric", 84),
  makeProduct(102, "Sparklers", "30cm Colour", 90),
  makeProduct(103, "Sparklers", "30cm Green", 100),
  makeProduct(104, "Sparklers", "30cm Red", 110),
  makeProduct(105, "Sparklers", "50cm Electric", 360),
  makeProduct(106, "Sparklers", "50cm Colour", 400),
  makeProduct(107, "Sparklers", "Dancing Sparklers", 450),

  // BIJILI CRACKERS
  makeProduct(108, "Bijili Crackers", "Red Bijili", 78),
  makeProduct(109, "Bijili Crackers", "Gold Bijili", 86),
  makeProduct(110, "Bijili Crackers", "Gold Special Bijili", 104),

  // MONO SOUND CRACKERS
  makeProduct(111, "Mono Sound Crackers", "2½ inch Laxmi", 16),
  makeProduct(112, "Mono Sound Crackers", "2½ inch Kuruvi", 22),
  makeProduct(113, "Mono Sound Crackers", "3½ inch Laxmi", 30),
  makeProduct(114, "Mono Sound Crackers", "4 inch Laxmi", 42),
  makeProduct(115, "Mono Sound Crackers", "4 inch Gold Laxmi", 70),
  makeProduct(116, "Mono Sound Crackers", "4 inch Deluxe Jai Bajrangbali / Hulk", 82),
  makeProduct(117, "Mono Sound Crackers", "20 Deluxe Crackers", 100),
  makeProduct(118, "Mono Sound Crackers", "24 Deluxe Crackers", 116),
  makeProduct(119, "Mono Sound Crackers", "100 Deluxe Crackers", 460),
  makeProduct(120, "Mono Sound Crackers", "28 Chorsa", 32),
  makeProduct(121, "Mono Sound Crackers", "56 Chorsa", 66),
  makeProduct(122, "Mono Sound Crackers", "28 Giant Crackers", 60),
  makeProduct(123, "Mono Sound Crackers", "56 Giant Crackers", 122),

  // WALA ITEMS
  makeProduct(124, "Wala Items", "100 Wala", 120),
  makeProduct(125, "Wala Items", "200 Wala", 240),
  makeProduct(126, "Wala Items", "300 Wala", 358),
  makeProduct(127, "Wala Items", "600 Wala", 600),
  makeProduct(128, "Wala Items", "1000 Wala", 780),
  makeProduct(129, "Wala Items", "2000 Wala", 1560),
  makeProduct(130, "Wala Items", "5000 Wala", 3900),
  makeProduct(131, "Wala Items", "10000 Wala", 7800),

  // ELITE SERIES (NEW ARRIVAL)
  makeProduct(132, "Elite Series", "Money in Bank (3 Pcs)", 280),
  makeProduct(133, "Elite Series", "Crorepati (2 Pcs)", 330),
  makeProduct(134, "Elite Series", "Ultra Pencil (3 Pcs)", 136),
  makeProduct(135, "Elite Series", "Blast Gun (2 Pcs)", 340),
  makeProduct(136, "Elite Series", "Bus / Train", 410),
  makeProduct(137, "Elite Series", "Golden Rise / Colour Rain / Peacock Feathers (5 Pcs)", 178),
  makeProduct(138, "Elite Series", "Red Sun / Blue Ice / Sky King (5 Pcs)", 340),
  makeProduct(139, "Elite Series", "Tri Colour Fountain (5 Pcs)", 440),
  makeProduct(140, "Elite Series", "Jungle Fountain", 360),
  makeProduct(141, "Elite Series", "Holly Nite (6 Pcs & 6 Colors)", 380),
  makeProduct(142, "Elite Series", "Kulfi / Casata / Vanilla (1 Pce)", 150),
  makeProduct(143, "Elite Series", "Gundu Malli (3 Pcs)", 400),
  makeProduct(144, "Elite Series", "Black & White (6 Pcs)", 380),
  makeProduct(145, "Elite Series", "Old Monk (3 Pcs)", 620),
  makeProduct(146, "Elite Series", "4x4 Wheel (5 Pcs)", 300),
  makeProduct(147, "Elite Series", "Sun Drops / Moon Drops (3 Pcs)", 220),
  makeProduct(148, "Elite Series", "3D Pots (Gold / Silver) (3 Pcs)", 130),
  makeProduct(149, "Elite Series", "Colour Bouquet (Violet) (3 Pcs)", 496),
  makeProduct(150, "Elite Series", "Dora Singer (5 Pcs)", 340),
  makeProduct(151, "Elite Series", "90 Watts (3 Pcs)", 300),
  makeProduct(152, "Elite Series", "Pinky Pots (6 Pcs)", 640),
  makeProduct(153, "Elite Series", "Mini Bulls (5 Pcs)", 410),
  makeProduct(154, "Elite Series", "Tin Series (1 Pce)", 230),
  makeProduct(155, "Elite Series", "Meta / Canval / Flickr (1 Pce) 3 in 1", 650),
  makeProduct(156, "Elite Series", "Panda / Baboon 2 in 1", 420),
  makeProduct(157, "Elite Series", "I-Cone (2 Pcs)", 440),
  makeProduct(158, "Elite Series", "Hand Shot (288)", 1000),
  makeProduct(159, "Elite Series", "Palak Wheel (5 Pcs) (Chakkar with Flower Pots)", 500),

  // ROLL CAP & COLOUR MATCHES — NETT RATE, NO DISCOUNT
  makeProduct(160, "Roll Cap & Colour Matches", "Roll Cap", 70, "1 Box", true),
  makeProduct(161, "Roll Cap & Colour Matches", "Ring Cap", 100, "1 Box", true),
  makeProduct(162, "Roll Cap & Colour Matches", "Pirates Gun (Ring Cap)", 165, "1 Box", true),
  makeProduct(163, "Roll Cap & Colour Matches", "Terminator Gun (Ring Cap)", 290, "1 Box", true),
  makeProduct(164, "Roll Cap & Colour Matches", "Robin Super Max 3 in 1", 40, "1 Box", true),
  makeProduct(165, "Roll Cap & Colour Matches", "Robin Super Deluxe 10 in 1", 80, "1 Box", true),
  makeProduct(166, "Roll Cap & Colour Matches", "Robin Classic 5 in 1", 120, "1 Box", true),
  makeProduct(167, "Roll Cap & Colour Matches", "Robin VIP 10 in 1", 190, "1 Box", true),
  makeProduct(168, "Roll Cap & Colour Matches", "Colour Smoke Matches (15 Pcs)", 150, "1 Box", true),
  makeProduct(169, "Roll Cap & Colour Matches", "Snake Serpent (1 Doz)", 25, "1 Dozen", true),
  makeProduct(170, "Roll Cap & Colour Matches", "Colour Smoke Matches (4 Pcs)", 30, "1 Box", true)
];

