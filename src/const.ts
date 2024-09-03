// File Contains Global Constants or Classes used throughout the frontend

// Class for each Algorithm (Only contains constant attributes, hence exc. time, main alg, alt alg)
export class AlgorithmConst {
    // For OLL, type = number, e.g. OLL 1 => '1'. For PLL, type = perm type, e.g. Jb Perm => 'Jb'
    private type: string;
    // Index for React Select in Timer Component and for MongoDB Requests, e.g. OLL 1 => 0, OLL 2 => 1, etc
    private index: number
    // Displayed Label for Each Algorithm in algorithms component, e.g. OLL 1 => '1 (Dot)'
    private label: string;
    // A Scramble that would lead to each algorithm in Rubik's Cube Notation 
    private scramble: string;
    // Path to Image of algorithm (from assets)
    private imgPath: string;
    // Array containing popular variants of each algorithm (For Datalist in Algorithm Component)
    private popularAlgs: string[];
    
    public constructor(type:string, index: number, label:string, scramble:string, imgPath:string, popularAlgs:string[]) {
        this.type = type;
        this.index = index;
        this.label = label;
        this.scramble = scramble;
        this.imgPath = imgPath;
        this.popularAlgs = popularAlgs;
    }

    //Setter and Getters

    getType() {
        return this.type;
    }

    getIndex() {
        return this.index;
    }

    getLabel() {
        return this.label;
    }

    getScramble() {
        return this.scramble;
    }

    getImgPath() {
        return this.imgPath;
    }

    getPopularAlg() {
        return this.popularAlgs;
    }

}

// AlgorithmConst array for each OLL algorithm
export const OLLConst: AlgorithmConst[] = [new AlgorithmConst("1", 0, "1 (Dot)", "L' B L B' U2 L' B L B2 U2 B", "src/assets/oll/1.png", ["R U2 R2 F R F' U2 R' F R F'", "R U B' R B R2 U' R' F R F'", "y R U' R2 D' r U' r' D R2 U R'", "r U R' U R' r2 U' R' U R' r2 U2 r'"]),
new AlgorithmConst("2", 1, "2 (Dot)", "B' R' F' U2 F2 R B' R2 F' R2 B2", "src/assets/oll/2.png", ["F R U R' U' F' f R U R' U' f'", "F R U R' U' S R U R' U' f'", "y r U r' U2 R U2 R' U2 r U' r'", "R' U2 r U' r' U2 r U r' U2 R"]),
new AlgorithmConst("3", 2, "3 (Dot)", "B U' L U' L' U' L' B L B' U2 B'", "src/assets/oll/3.png", ["y' f R U R' U' f' U' F R U R' U' F'", "r' R2 U R' U r U2 r' U M'", "y F U R U' R' F' U F R U R' U' F'", "r' R U R' F2 R U L' U L M'"]),
new AlgorithmConst("4", 3, "4 (Dot)", "L' U' B' U B L F' L' U' L U F", "src/assets/oll/4.png", ["y' f R U R' U' f' U F R U R' U' F'", "M U' r U2 r' U' R U' R2 r", "y F U R U' R' F' U' F R U R' U' F'", "M U' r U2 r' U' R U' R' M'"]),
new AlgorithmConst("5", 4, "5 (Square Shape)", "R B2 R2 U2 R B R' U2 R2 B2 R'", "src/assets/oll/5.png", ["r' U2 R U R' U r", "y2 R' F2 r U r' F R", "F R U R' U' F' U' F R U R' U' F'"]),
new AlgorithmConst("6", 5, "6 (Square Shape)", "B U2 B' R2 U' R B U B' R' U R2", "src/assets/oll/6.png", ["r U2 R' U' R U' r'", "y' x' D R2 U' R' U R' D' x", "y2 R U R2 F R F' U F"]),
new AlgorithmConst("7", 6, "7 (Small Lightning Bolt)", "F' L F' R' D2 B2 L' R D2 L F2 L'", "src/assets/oll/7.png", ["r U R' U R U2 r'", "F R' F' R U2 R U2 R'"]),
new AlgorithmConst("8", 7, "8 (Small Lightning Bolt)", "L F L' U2 L F2 R' F L' F R F'", "src/assets/oll/8.png", ["y2 r' U' R U' R' U2 r", "R U2 R' U2 R' F R F'"]),
new AlgorithmConst("9", 8, "9 (Fish Shape)", "L R2 D2 L2 B' L2 D2 R F R F2 L'", "src/assets/oll/9.png", ["y R U R' U' R' F R2 U R' U' F'", "r' R2 U2 R' U' R U' R' U' M'", "y' L' U' L U' L F' L' F L' U2 L", "y2 R' U' R U' R' U R' F R F' U R"]),
new AlgorithmConst("10", 9, "10 (Fish Shape)", "F R B R' F' R B L' B' L B' R'", "src/assets/oll/10.png", ["R U R' U R' F R F' R U2 R'", "y2 L' U' L U L F' L2 U' L U F", "R U R' y R' F R U' R' F' R", "R U R' y' r' U r U' r' U' r"]),
new AlgorithmConst("11", 10, "11 (Small Lightning Bolt)", "B2 D F' L' F D' B' U L U L' B'", "src/assets/oll/11.png", ["r' R2 U R' U R U2 R' U M'", "M R U R' U R U2 R' U M'", "y2 r U R' U R' F R F' R U2 r'", "y F' L' U' L U F U F R U R' U' F'"]),
new AlgorithmConst("12", 11, "12 (Small Lightning Bolt)", "L' B L F' L B' L2 F U2 F' L F", "src/assets/oll/12.png", ["F R U R' U' F' U F R U R' U' F'", "y' M' R' U' R U' R' U2 R U' M", "y' r R2 U' R U' R' U2 R U' R r'", "y l L2 U' L U' L' U2 L U' M'"]),
new AlgorithmConst("13", 12, "13 (Knight Move Shape)", "L2 D' R B2 R' D L U B' U B L", "src/assets/oll/13.png", ["r U' r' U' r U r' F' U F", "F U R U2 R' U' R U R' F'"]),
new AlgorithmConst("14", 13, "14 (Knight Move Shape)", "B' R' F U F' U F U2 F' U2 R B", "src/assets/oll/14.png", ["R' F R U R' F' R F U' F'", "R' F R U R' F' R y' R U' R'"]),
new AlgorithmConst("15", 14, "15 (Knight Move Shape)", "R B' D' B' D2 F L2 F' D' B2 R'", "src/assets/oll/15.png", ["r' U' r R' U' R U r' U r", "r' U' M' U' R U r' U r", "y2 R' F R U R' U' F' R U' R' U2 R"]),
new AlgorithmConst("16", 15, "16 (Knight Move Shape)", "L' B' U B L2 D R' F' R D' L'", "src/assets/oll/16.png", ["r U r' R U R' U' r U' r'", "r U M U R' U' r U' r'", "y2 R U R' U' R U' R' U2 F R U R' U' F'"]),
new AlgorithmConst("17", 16, "17 (Dot)", "R U B' U' L' B2 R' L U' R B R'", "src/assets/oll/17.png", ["R U R' U R' F R F' U2 R' F R F'", "y2 F R' F' R2 r' U R U' R' U' M'", "f R U R' U' f' U' R U R' U' R' F R F'"]),
new AlgorithmConst("18", 17, "18 (Dot)", "B U2 B' R' F' U2 F R B U2 B'", "src/assets/oll/18.png", ["r U R' U R U2 r2 U' R U' R' U2 r", "y R U2 R2 F R F' U2 M' U R U' r'", "y2 F R U R' d R' U2 R' F R F'", "y2 F R U R' U y' R' U2 R' F R F'"]),
new AlgorithmConst("19", 18, "19 (Dot)", "R' U' F' L U F' U' L' U F2 R", "src/assets/oll/19.png", ["M U R U R' U' M' R' F R F'", "r' R U R U R' U' r R2 F R F'", "r' U2 R U R' U r2 U2 R' U' R U' r'", "R' U2 F R U R' U' F2 U2 F R"]),
new AlgorithmConst("20", 19, "20 (Dot)", "F2 U2 R L' B R2 L2 F D2 F2 R L'", "src/assets/oll/20.png", ["M U R U R' U' M2 U R U' r'", "r U R' U' M2 U R U' R' U' M'", "M' U M' U M' U M' U' M' U M' U M' U M' U M'"]),
new AlgorithmConst("21", 20, "21 (Cross)", "L F' L F L2 B L' B' L B' U2 B", "src/assets/oll/21.png", ["y R U2 R' U' R U R' U' R U' R'", "y F R U R' U' R U R' U' R U R' U' F'"]),
new AlgorithmConst("22", 21, "22 (Cross)", "B L' F2 L U2 B2 R' D2 R B2 U2 B'", "src/assets/oll/22.png", ["R U2 R2 U' R2 U' R2 U2 R", "R' U2 R2 U R2 U R2 U2 R'"]),
new AlgorithmConst("23", 22, "23 (Cross)", "F2 U L' F2 D F2 D' L2 U L' U' F2", "src/assets/oll/23.png", ["R2 D R' U2 R D' R' U2 R'", "y2 R2 D' R U2 R' D R U2 R", "y R U R' U' R U' R' U2 R U' R' U2 R U R'"]),
new AlgorithmConst("24", 23, "24 (Cross)", "F' U' F U F R' F' U' F' U F R", "src/assets/oll/24.png", ["r U R' U' r' F R F'", "y2 r' U' R U' R' U2 r", "y' x' R U R' D R U' R' D' x", "L F R' F' L' F R F'"]),
new AlgorithmConst("25", 24, "25 (Cross)", "B' R' B F' L' B' L F L' R B L", "src/assets/oll/25.png", ["y F' r U R' U' r' F R", "F R' F' r U R U' r'"]),
new AlgorithmConst("26", 25, "26 (Cross)", "R' U2 R2 U R2 U R U' R U' R'", "src/assets/oll/26.png", ["y R U2 R' U' R U' R'", "R' U' R U' R' U2 R"]),
new AlgorithmConst("27", 26, "27 (Cross)", "B' U' B U' B2 F R2 B R2 B F'", "src/assets/oll/27.png", ["R U R' U R U2 R'", "y' R' U2 R U R' U R", "y L' U2 L U L' U L"]),
new AlgorithmConst("28", 27, "28 (Corners Oriented)", "F U' F' U F B' R' F R F2 B", "src/assets/oll/28.png", ["r U R' U' M U R U' R'", "y2 M' U M U2 M' U M", "r U R' U' r' R U R U' R'", "y' M' U' M U2 M' U' M"]),
new AlgorithmConst("29", 28, "29 (Awkward Shape)", "L R' F' L' F U' R F R' U R F'", "src/assets/oll/29.png", ["M U R U R' U' R' F R F' M'", "y R U R' U' R U' R' F' U' F R U R'", "r2 D' r U r' D r2 U' r' U' r", "y2 R' F R F' R U2 R' U' F' U' F"]),
new AlgorithmConst("30", 29, "30 (Awkward Shape)", "D' L B L2 B' L F2 D R2 U' R2 F2", "src/assets/oll/30.png", ["y2 F U R U2 R' U' R U2 R' U' F'", "y' r' D' r U' r' D r2 U' r' U r U r'", "y2 F R' F R2 U' R' U' R U R' F2"]),
new AlgorithmConst("31", 30, "31 (P Shape)", "F2 D' L2 B L B' L D F2 R U2 R'", "src/assets/oll/31.png", ["R' U' F U R U' R' F' R", "y2 S' L' U' L U L F' L' f'", "y' F R' F' R U R U R' U' R U' R'", "y S R U R' U' f' U' F"]),
new AlgorithmConst("32", 31, "32 (P Shape)", "L' B' L R B' U2 F R' F' U2 R' B2", "src/assets/oll/32.png", ["S R U R' U' R' F R f'", "R U B' U' R' U R B R'", "y2 L U F' U' L' U L F L'"]),
new AlgorithmConst("33", 32, "33 (T Shape)", "B2 U2 B' U' L U L' U B U B2", "src/assets/oll/33.png", ["R U R' U' R' F R F'", "F R U' R' U R U R' F'"]),
new AlgorithmConst("34", 33, "34 (C Shape)", "B L' B L2 U L' U' B2 U2 R' U R", "src/assets/oll/34.png", ["y2 R U R2 U' R' F R U R U' F'", "y2 R U R' U' B' R' F R F' B", "F R U R' U' R' F' r U R U' r'", "y2 R U R' U' x D' R' U R U' D"]),
new AlgorithmConst("35", 34, "35 (Fish Shape)", "R D2 L2 B L2 D2 R' B' R' F R B", "src/assets/oll/35.png", ["R U2 R2 F R F' R U2 R'", "f R U R' U' f' R U R' U R U2 R'", "y' R' U2 R l U' R' U l' U2 R", "y' R U2 R' U' R U' R' U2 F R U R' U' F'"]),
new AlgorithmConst("36", 35, "36 (W Shape)", "B' R2 D' F2 R' D2 B' L' D' B2 R'", "src/assets/oll/36.png", ["R' U' R U' R' U R U l U' R' U", "y2 R U R' F' R U R' U' R' F R U' R' F R F'", "R U R' U' F' U2 F U R U R'"]),
new AlgorithmConst("37", 36, "37 (Fish Shape)", "F' U2 F R2 B2 L' B R' B' L B2 R'", "src/assets/oll/37.png", ["F R U' R' U' R U R' F'", "F R' F' R U R U' R'", "R' F R F' U' F' U F"]),
new AlgorithmConst("38", 37, "38 (W Shape)", "B2 U L' B' R L D B' D' R' B'", "src/assets/oll/38.png", ["R U R' U R U' R' U' R' F R F'", "R' U2 r' D' r U2 r' D R r"]),
new AlgorithmConst("39", 38, "39 (Big Lightning Bolt)", "F U L F' D R' F R D2 L D L2", "src/assets/oll/39.png", ["y L F' L' U' L U F U' L'", "y' R U R' F' U' F U R U2 R'"]),
new AlgorithmConst("40", 39, "40 (Big Lightning Bolt)", "B U R' F2 D2 L' D2 F' R F' U B'", "src/assets/oll/40.png", ["y R' F R U R' U' F' U R", "R r D r' U r D' r' U' R'"]),
new AlgorithmConst("41", 40, "41 (Awkward Shape)", "F2 U2 R B L U L' B' U' R' U F2", "src/assets/oll/41.png", ["y2 R U R' U R U2 R' F R U R' U' F'", "R U' R' U2 R U y R U' R' U' F'"]),
new AlgorithmConst("42", 41, "42 (Awkward Shape)", "F D B' R B D' F' U R U2 R'", "src/assets/oll/42.png", ["R' U' R U' R' U2 R F R U R' U' F'", "M U F R U R' U' F' M'", "y R' F R F' R' F R F' R U R' U' R U R'"]),
new AlgorithmConst("43", 42, "43 (P Shape)", "F' U' L U F U' L' U' L' U L", "src/assets/oll/43.png", ["f' L' U' L U f"]),
new AlgorithmConst("44", 43, "44 (P Shape)", "B' R B R' U' B U' B' R' U R", "src/assets/oll/44.png", ["f R U R' U' f'"]),
new AlgorithmConst("45", 44, "45 (T Shape)", "D2 F2 B2 U2 D2 F' B2 U R U' R' F'", "src/assets/oll/45.png", ["F R U R' U' F'"]),
new AlgorithmConst("46", 45, "46 (C Shape)", "F' L F L F2 L2 U' L' U L' F2 L2", "src/assets/oll/46.png", ["R' U' R' F R F' U R"]),
new AlgorithmConst("47", 46, "47 (Small L Shape)", "L U F U' F' L' R' U' F' U F R", "src/assets/oll/47.png", ["R' U' R' F R F' R' F R F' U R", "y' F R' F' R U2 R U' R' U R U2 R'"]),
new AlgorithmConst("48", 47, "48 (Small L Shape)", "B L2 F' L' F L F' L2 B' L F L'", "src/assets/oll/48.png", ["F R U R' U' R U R' U' F'", "R U2 R' U' R U R' U2 R' F R F'"]),
new AlgorithmConst("49", 48, "49 (Small L Shape)", "R' F' U' F U F' R B' R' F R B", "src/assets/oll/49.png", ["y2 r U' r2 U r2 U r2 U' r"]),
new AlgorithmConst("50", 49, "50 (Small L Shape)", "L F R U2 R' U F' L F' L' F L'", "src/assets/oll/50.png", ["r' U r2 U' r2 U' r2 U r'"]),
new AlgorithmConst("51", 50, "51 (I Shape)", "R U2 R' U' R B' R B R' U' R'", "src/assets/oll/51.png", ["f R U R' U' R U R' U' f'", "y2 F U R U' R' U R U' R' F'", "y' R' U' R' F R F' R U' R' U2 R"]),
new AlgorithmConst("52", 51, "52 (I Shape)", "B F2 D' B D' B' D L' D L B' F2", "src/assets/oll/52.png", ["R U R' U R d' R U' R' F'", "R' U' R U' R' U F' U F R", "y2 R' F' U' F U' R U R' U R"]),
new AlgorithmConst("53", 52, "53 (Small L Shape)", "F2 L' F L2 B' U2 B2 L B' U2 L' F", "src/assets/oll/53.png", ["r' U' R U' R' U R U' R' U2 r", "y2 l' U' L U' L' U L U' L' U2 l", "y r' U2 R U R' U' R U R' U r"]),
new AlgorithmConst("54", 53, "54 (Small L Shape)", "R U2 R' U2 R' U' F U R2 U' R' F'", "src/assets/oll/54.png", ["r U R' U R U' R' U R U2 r'", "y' r U2 R' U' R U R' U' R U' r'", "y' r U r' R U R' U' R U R' U' r U' r'"]),
new AlgorithmConst("55", 54, "55 (I Shape)", "L D' L2 U B' U2 B U' L2 D L'", "src/assets/oll/55.png", ["R U2 R2 U' R U' R' U2 F R F'", "y R' F R U R U' R2 F' R2 U' R' U R U R'", "r U2 R2 F R F' U2 r' F R F'", "y R' F U R U' R2 F' R2 U R' U' R"]),
new AlgorithmConst("56", 55, "56 (I Shape)", "L' F U R U' F' L2 F R' F' L'", "src/assets/oll/56.png", ["r U r' U R U' R' U R U' R' r U' r'", "r' U' r U' R' U R U' R' U R r' U r", "y f R U R' U' f' F R U R' U' R U R' U' F'", "F R U R' U' R F' r U R' U' r'"]),
new AlgorithmConst("57", 56, "57 (Corners Oriented)", "R U' F' U2 D2 B U B' U2 D2 F R'", "src/assets/oll/57.png", ["R U R' U' M' U R U' r'", "R U R' U' r R' U R U' r'", "M' U M' U M' U2 M U M U M", "M' U M' U M' U M' U2 M' U M' U M' U M'"]),
];

// AlgorithmConst array for each PLL algorithm
export const PLLConst: AlgorithmConst[] = [new AlgorithmConst("Aa", 57, "Aa Perm", "L B U' L D L' U L D' L' B' L'", "src/assets/pll/Aa.png", ["y2 x' R2 D2 R' U' R D2 R' U R'", "y x R' U R' D2 R U' R' D2 R2"]),
new AlgorithmConst("Ab", 58, "Ab Perm", "F2 R' F' L F R2 F' L' F R' F2", "src/assets/pll/Ab.png", ["y2 x R2 D2 R U R' D2 R U' R", "y' x' R U' R D2 R' U R D2 R2", "y r U r' U2 R U2 R' U2 r U' r'"]),
new AlgorithmConst("E", 59, "E Perm", "L2 U F2 U' B2 U F2 L2 U' B2 U L2 D' B2 D", "src/assets/pll/E.png", ["x' R U' R' D R U R' D' R U R' D R U' R' D'"]),
new AlgorithmConst("F", 60, "F Perm", "R2 D B2 D' L2 R2 F2 D F2 D' L2 U' L2 F2 L2", "src/assets/pll/F.png", ["R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"]),
new AlgorithmConst("Ga", 61, "Ga Perm", "B2 L' R2 D L' D' L2 U L U' L' R2 B2", "src/assets/pll/Ga.png", ["R2 U R' U R' U' R U' R2 U' D R' U R D'", "R2 u R' U R' U' R u' R2 y' R' U R"]),
new AlgorithmConst("Gb", 62, "Gb Perm", "F2 L2 U B2 L2 U L2 B2 R2 B2 D R2 D' L2 D", "src/assets/pll/Gb.png", ["R' U' R U D' R2 U R' U R U' R U' R2 D", "y F' U' F R2 u R' U R U' R u' R2"]),
new AlgorithmConst("Gc", 63, "Gc Perm", "L U2 F2 D R2 D' F2 U' L B2 U2 L U2 B2 L2", "src/assets/pll/Gc.png", ["R2 U' R U' R U R' U R2 U D' R U' R' D", "y2 R2 F2 R U2 R U2 R' F R U R' U' R' F R2", "R2 u' R U' R U R' u R2 y R U' R'"]),
new AlgorithmConst("Gd", 64, "Gd Perm", "R2 D L R' U2 L' R U' R2 U B2 U' R2 B2 D'", "src/assets/pll/Gd.png", ["R U R' U' D R2 U' R U' R' U R' U R2 D'", "R U R' y' R2 u' R U' R' U R' u R2"]),
new AlgorithmConst("H", 65, "H Perm", "B2 L R B2 L R' B2 L2 B2 U2 L2", "src/assets/pll/H.png", ["M2 U M2 U2 M2 U M2", "M2 U' M2 U2 M2 U' M2"]),
new AlgorithmConst("Ja", 66, "Ja Perm", "B2 U F B2 D' B2 D L2 F' U' F L2 F' B2", "src/assets/pll/Ja.png", ["x R2 F R F' R U2 r' U r U2", "y2 L' U' L F L' U' L U L F' L2 U L2", "y' R' U L' U2 R U' R' U2 R L"]),
new AlgorithmConst("Jb", 67, "Jb Perm", "F D B2 U2 B D' F D B2 R2 B' D' F2", "src/assets/pll/Jb.png", ["R U R' F' R U R' U' R' F R2 U' R'"]),
new AlgorithmConst("Na", 68, "Na Perm", "B R' L2 F R' D2 L B' L B L2 D2 R2 L2 B'", "src/assets/pll/Na.png", ["R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", "z U R' D R2 U' R D' U R' D R2 U' R D'", "r' D' F r U' r' F' D r2 U r' U' r' F r F'"]),
new AlgorithmConst("Nb", 69, "Nb Perm", "L2 D2 F2 U L' R' B2 U2 B2 F2 L R' U' L2 U2 B2", "src/assets/pll/Nb.png", ["R' U R U' R' F' U' F R U R' F R' F' R U' R", "z D' R U' R2 D R' U D' R U' R2 D R' U"]),
new AlgorithmConst("Ra", 70, "Ra Perm", "L2 F U2 F' U' L U L' U2 L U L B' U2 B", "src/assets/pll/Ra.png", ["R U' R' U' R U R D R' U' R D' R' U2 R'", "R U R' F' R U2 R' U2 R' F R U R U2 R'"]),
new AlgorithmConst("Rb", 71, "Rb Perm", "L2 D R2 D L U L' B2 R D' R D' L2 F2' L2 U2 B2", "src/assets/pll/Rb.png", ["R2 F R U R U' R' F' R U2 R' U2 R", "y' R' U2 R U2 R' F R U R' U' R' F' R2", "R' U2 R' D' R U' R' D R U R U' R' U' R"]),
new AlgorithmConst("T", 72, "T Perm", "R2 L F R' D2 L B' L' D2 R2 F' R L'", "src/assets/pll/T.png", ["R U R' U' R' F R2 U' R' U' R U R' F'"]),
new AlgorithmConst("Ua", 73, "Ua Perm", "B' F2 D R2 B2 F' U B2 F D' R2 B F2", "src/assets/pll/Ua.png", ["M2 U M U2 M' U M2", "R U' R U R U R U' R' U' R2", "y2 R2 U' R' U' R U R U R U' R"]),
new AlgorithmConst("Ub", 74, "Ub Perm", "F2 L2 R2 B2 D2 B D B L2 R2 F' U' F'", "src/assets/pll/Ub.png", ["M2 U' M U2 M' U' M2", "R2 U R U R' U' R' U' R' U R'", "y2 R' U R' U' R' U' R' U R U R2", "y2 R' U R' U' R3 U' R' U R U R2"]),
new AlgorithmConst("V", 75, "V Perm", "D' B2 U' R2 U2 R2 B2 U' B2 U B2 D2 L2 D' L2", "src/assets/pll/V.png", ["R' U R' U' y R' F' R2 U' R' U R' F R F", "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2", "z D' R2 D R2 U R' D' R U' R U R' D R U' z'", "R U2 R' D R U' R U' R U R2 D R' U' R D2", "x' R' F R F' U R U2 R' U' R U' R' U2 R U R' U'"]),
new AlgorithmConst("Y", 76, "Y Perm", "F' B' R' U2 F U' F' U' R F R' U' R B", "src/assets/pll/Y.png", ["F R U' R' U' R U R' F' R U R' U' R' F R F'"]),
new AlgorithmConst("Z", 77, "Z Perm", "F2 U F' U' F' L2 F D F' D' L2 U F'", "src/assets/pll/Z.png", ["M' U M2 U M2 U M' U2 M2", "M U M2 U M2 U M U2 M2"]),
];