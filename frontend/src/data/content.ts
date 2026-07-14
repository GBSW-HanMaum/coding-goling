import type { Challenge, Course, Language } from "./types";

/**
 * 코드런 학습 콘텐츠 (초안).
 * - Python 트랙: WRITE/BUGFIX는 Pyodide로 "실제 실행" 채점.
 * - C 트랙: 초안에서는 출력 예측/빈칸/재배열 위주. 실제 C 실행은
 *   계획서의 Docker 샌드박스 백엔드 연동 예정.
 * 계획서대로 콘텐츠는 코드에서 분리해 두어 JSON/YAML로 옮기기 쉽게 했다.
 */

export const python: Course = {
  id: "python",
  title: "파이썬 입문",
  emoji: "🐍",
  description: "실행하며 배우는 파이썬 기초",
  units: [
    {
      id: "py-u1",
      order: 1,
      title: "유닛 1 · 파이썬 첫 걸음",
      description: "출력과 변수, 그리고 첫 실행 채점",
      lessons: [
        {
          id: "py-u1-l1",
          title: "출력하기",
          challenges: [
            {
              id: "py-u1-l1-c1",
              conceptTags: ["output"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 실행 결과는?",
              codeSnippet: 'print("코드런")',
              explanation:
                "print() 는 괄호 안의 값을 화면에 출력합니다. 문자열의 따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코드런", correct: true },
                { id: "b", text: '"코드런"', correct: false },
                { id: "c", text: "print(코드런)", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u1-l1-c2",
              conceptTags: ["output"],
              type: "FILL",
              language: "python",
              question: "화면에 Hello 를 출력하도록 빈칸을 채우세요.",
              explanation: "파이썬에서 출력에 쓰는 함수 이름을 떠올려 보세요.",
              fillCode: '{{0}}("Hello")',
              fillAnswers: [["print"]],
            },
            {
              id: "py-u1-l1-c3",
              conceptTags: ["output"],
              type: "WRITE",
              language: "python",
              question: "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요:  안녕, 코드런!",
              explanation:
                'print("안녕, 코드런!") 처럼 문자열을 그대로 출력하면 됩니다.',
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "안녕, 코드런!" }],
            },
          ],
        },
        {
          id: "py-u1-l2",
          title: "변수와 계산",
          challenges: [
            {
              id: "py-u1-l2-c1",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "x = 5\ny = 3\nprint(x * y)",
              explanation: "* 는 곱셈입니다. 5 × 3 = 15.",
              options: [
                { id: "a", text: "15", correct: true },
                { id: "b", text: "8", correct: false },
                { id: "c", text: "53", correct: false },
                { id: "d", text: "x * y", correct: false },
              ],
            },
            {
              id: "py-u1-l2-c2",
              conceptTags: ["variable", "operator"],
              type: "WRITE",
              language: "python",
              question:
                "한 줄에 공백으로 구분된 정수 두 개를 입력받아, 그 합을 출력하세요.",
              explanation:
                "input().split() 으로 나누고 map(int, ...) 으로 정수 변환한 뒤 더하면 됩니다. x+=1 이든 x=x+1 이든 결과만 같으면 정답입니다.",
              starterCode:
                "# 예) 입력 '3 5' → 출력 '8'\na, b = input().split()\n",
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-7 7", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u1-l2-c3",
              conceptTags: ["variable", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "1부터 n까지의 합을 출력해야 하는데 결과가 이상합니다. 버그를 고치세요.",
              explanation:
                "range(n) 은 0부터 n-1 까지입니다. 1부터 n까지 돌려면 range(1, n+1) 이 필요합니다.",
              starterCode:
                "n = int(input())\ntotal = 0\nfor i in range(n):      # ← 버그\n    total += i\nprint(total)\n",
              testCases: [
                { stdin: "5", expected: "15" },
                { stdin: "10", expected: "55" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u1-l3",
          title: "문자열 다루기",
          challenges: [
            {
              id: "py-u1-l3-c1",
              conceptTags: ["variable", "io"],
              type: "PARSONS",
              language: "python",
              question:
                "이름을 입력받아  반가워, <이름>!  을 출력하도록 줄 순서를 맞추세요.",
              explanation:
                "먼저 입력을 받고(name), 인사말을 만든 뒤(greeting), 마지막에 출력합니다.",
              parsonsLines: [
                "name = input()",
                'greeting = "반가워, " + name + "!"',
                "print(greeting)",
              ],
            },
            {
              id: "py-u1-l3-c2",
              conceptTags: ["variable", "operator"],
              type: "FILL",
              language: "python",
              question: "두 변수를 더한 값이 출력되도록 빈칸을 채우세요.",
              explanation: "덧셈 연산자를 넣으면 됩니다.",
              fillCode: "x = 10\ny = 20\nprint(x {{0}} y)",
              fillAnswers: [["+"]],
            },
            {
              id: "py-u1-l3-c3",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "PYTHON"\nprint(s[1])',
              explanation:
                "인덱스는 0부터 시작합니다. s[0]='P', s[1]='Y' 입니다.",
              options: [
                { id: "a", text: "Y", correct: true },
                { id: "b", text: "P", correct: false },
                { id: "c", text: "O", correct: false },
                { id: "d", text: "PYTHON", correct: false },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u2",
      order: 2,
      title: "유닛 2 · 조건과 반복",
      description: "if 문과 for/while 로 흐름을 제어하기",
      lessons: [
        {
          id: "py-u2-l1",
          title: "조건문",
          challenges: [
            {
              id: "py-u2-l1-c1",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "python",
              question: "x = 7 일 때 아래 코드의 출력은?",
              codeSnippet: "if x % 2 == 0:\n    print('짝')\nelse:\n    print('홀')",
              explanation: "7 % 2 는 1 이라 0이 아니므로 else 로 갑니다.",
              options: [
                { id: "a", text: "홀", correct: true },
                { id: "b", text: "짝", correct: false },
                { id: "c", text: "7", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "py-u2-l1-c2",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 짝수면 '짝수', 홀수면 '홀수' 를 출력하세요.",
              explanation:
                "n % 2 == 0 이면 짝수입니다. 조건 표현식 print('짝수' if n%2==0 else '홀수') 도 정답입니다.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "4", expected: "짝수" },
                { stdin: "7", expected: "홀수" },
                { stdin: "0", expected: "짝수", hidden: true },
              ],
            },
            {
              id: "py-u2-l1-c3",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "60점 이상이면 '합격' 이어야 하는데 딱 60점이 불합격으로 나옵니다. 고치세요.",
              explanation:
                "'이상' 은 경계값을 포함합니다. > 대신 >= 를 써야 60도 합격입니다.",
              starterCode:
                "score = int(input())\nif score > 60:      # ← 버그\n    print('합격')\nelse:\n    print('불합격')\n",
              testCases: [
                { stdin: "60", expected: "합격" },
                { stdin: "59", expected: "불합격" },
                { stdin: "100", expected: "합격", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u2-l2",
          title: "반복문",
          challenges: [
            {
              id: "py-u2-l2-c1",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "python",
              question: "1부터 5까지의 합을 출력하도록 줄 순서를 맞추세요.",
              explanation:
                "합을 담을 변수를 0으로 초기화하고, 반복하며 더한 뒤, 마지막에 출력합니다.",
              parsonsLines: [
                "total = 0",
                "for i in range(1, 6):",
                "    total += i",
                "print(total)",
              ],
            },
            {
              id: "py-u2-l2-c2",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 1부터 n까지의 곱(n!)을 출력하세요.",
              explanation:
                "1로 시작하는 변수에 1..n 을 차례로 곱합니다. 5! = 120.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "5", expected: "120" },
                { stdin: "3", expected: "6" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
            {
              id: "py-u2-l2-c3",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question:
                "아래 코드가 출력하는 마지막 숫자는?",
              codeSnippet: "for i in range(3):\n    print(i)",
              explanation: "range(3) 은 0, 1, 2 를 만듭니다. 마지막은 2.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "1", correct: false },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u3",
      order: 3,
      title: "유닛 3 · 리스트와 문자열",
      description: "여러 값을 리스트에 담고, 문자열을 다루는 법",
      lessons: [
        {
          id: "py-u3-l1",
          title: "리스트 다루기",
          challenges: [
            {
              id: "py-u3-l1-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "nums = [10, 20, 30]\nprint(len(nums))",
              explanation: "len() 은 리스트의 원소 개수를 셉니다. 원소가 3개이므로 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "30", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "[10, 20, 30]", correct: false },
              ],
            },
            {
              id: "py-u3-l1-c2",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "python",
              question:
                "한 줄에 공백으로 구분된 정수 여러 개를 입력받아 리스트에 담고, 그 총합을 출력하세요.",
              explanation:
                "input().split() 으로 나눈 뒤 map(int, ...) 으로 정수 리스트를 만들고, sum() 으로 더하면 됩니다.",
              starterCode:
                "# 예) 입력 '1 2 3 4 5' → 출력 '15'\nnums = list(map(int, input().split()))\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "15" },
                { stdin: "10 20", expected: "30" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u3-l1-c3",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "리스트의 마지막 원소를 출력해야 하는데 범위 오류(IndexError)가 납니다. 버그를 고치세요.",
              explanation:
                "인덱스는 0부터 시작해 마지막 원소는 len(nums)-1 입니다. len(nums) 는 범위를 벗어납니다.",
              starterCode: "nums = [10, 20, 30]\nprint(nums[len(nums)])      # ← 버그\n",
              testCases: [{ expected: "30" }],
            },
          ],
        },
        {
          id: "py-u3-l2",
          title: "문자열 메서드",
          challenges: [
            {
              id: "py-u3-l2-c1",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "Hello"\nprint(s.upper())',
              explanation: "upper() 는 문자열의 모든 글자를 대문자로 바꿉니다.",
              options: [
                { id: "a", text: "HELLO", correct: true },
                { id: "b", text: "hello", correct: false },
                { id: "c", text: "Hello", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u3-l2-c2",
              conceptTags: ["string"],
              type: "FILL",
              language: "python",
              question: "문자열을 소문자로 바꿔 출력하도록 빈칸을 채우세요.",
              explanation: "소문자로 바꾸는 메서드는 lower() 입니다.",
              fillCode: 's = "PYTHON"\nprint(s.{{0}}())',
              fillAnswers: [["lower"]],
            },
            {
              id: "py-u3-l2-c3",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "python",
              question: "문자열을 한 줄 입력받아, 앞뒤 공백을 제거하고 출력하세요.",
              explanation: "strip() 은 문자열 양 끝의 공백(스페이스, 탭, 개행)을 제거합니다.",
              starterCode: "s = input()\n",
              testCases: [
                { stdin: "  hi  ", expected: "hi" },
                { stdin: "code", expected: "code" },
                { stdin: "   run  ", expected: "run", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u4",
      order: 4,
      title: "유닛 4 · 함수",
      description: "코드를 함수로 묶어 재사용하기",
      lessons: [
        {
          id: "py-u4-l1",
          title: "함수 정의하기",
          challenges: [
            {
              id: "py-u4-l1-c1",
              conceptTags: ["function"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "def add(a, b):\n    return a + b\n\nprint(add(3, 4))",
              explanation: "add(3, 4) 는 3 + 4 를 계산해 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u4-l1-c2",
              conceptTags: ["function", "io"],
              type: "PARSONS",
              language: "python",
              question: "정수를 입력받아 2배로 만들어 출력하도록 줄 순서를 맞추세요.",
              explanation: "함수를 먼저 정의하고, 입력을 받은 뒤, 함수를 호출해 출력합니다.",
              parsonsLines: [
                "def double(n):",
                "    return n * 2",
                "x = int(input())",
                "print(double(x))",
              ],
            },
            {
              id: "py-u4-l1-c3",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 n의 제곱을 반환하는 함수 square(n)을 작성하고, 그 결과를 출력하세요.",
              explanation: "함수 안에서 n * n 을 return 하면 됩니다.",
              starterCode:
                "def square(n):\n    # 여기에 코드를 작성하세요\n    pass\n\nn = int(input())\nprint(square(n))\n",
              testCases: [
                { stdin: "5", expected: "25" },
                { stdin: "3", expected: "9" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u4-l2",
          title: "중첩 반복문",
          challenges: [
            {
              id: "py-u4-l2-c1",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드는 총 몇 번 출력되나요?",
              codeSnippet:
                "for i in range(2):\n    for j in range(2):\n        print(i, j)",
              explanation: "바깥 반복 2번 × 안쪽 반복 2번 = 4번 출력됩니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "8", correct: false },
                { id: "d", text: "0", correct: false },
              ],
            },
            {
              id: "py-u4-l2-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "구구단처럼 n단을 1부터 n까지 출력해야 하는데, 마지막 줄(n x n)이 빠집니다. 버그를 고치세요.",
              explanation:
                "range(1, n) 은 n을 포함하지 않습니다. range(1, n+1) 이어야 n x n 까지 나옵니다.",
              starterCode:
                'n = int(input())\nfor i in range(1, n):      # ← 버그\n    print(n, "x", i, "=", n*i)\n',
              testCases: [{ stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9" }],
            },
            {
              id: "py-u4-l2-c3",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아, '*' 을 n개 이어붙인 줄을 n번 출력하세요 (n×n 정사각형).",
              explanation:
                '"*" * n 은 별표를 n번 반복한 문자열을 만듭니다. 그 줄을 n번 출력하면 됩니다.',
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "3", expected: "***\n***\n***" },
                { stdin: "1", expected: "*" },
                { stdin: "2", expected: "**\n**", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u5",
      order: 5,
      title: "유닛 5 · 딕셔너리",
      description: "키와 값으로 데이터를 묶어 관리하기",
      lessons: [
        {
          id: "py-u5-l1",
          title: "딕셔너리 다루기",
          challenges: [
            {
              id: "py-u5-l1-c1",
              conceptTags: [
                "dict"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 딕셔너리에서 특정 키의 값을 조회하는 프로그램을 작성하세요.\n예시\n입력: {'apple': 1, 'banana': 2, 'orange': 3}\nbanana\n출력: 2",
              explanation: "이 문제는 파이썬의 딕셔너리를 사용하여 키에 해당하는 값을 조회하는 방법을 연습하는 것입니다. 사용자는 입력으로 주어진 딕셔너리에서 특정 키의 값을 찾아 출력해야 합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "{'apple': 1, 'banana': 2, 'orange': 3}\napple",
                  expected: "1"
                },
                {
                  stdin: "{'cat': 5, 'dog': 10}\nbird",
                  expected: "키가 존재하지 않습니다."
                },
                {
                  stdin: "{'x': 100, 'y': 200}\ny",
                  expected: "200",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u5-l1-c2",
              conceptTags: [
                "dict"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 키와 값을 사용하여 딕셔너리에 값을 추가하고, 만약 키가 이미 존재한다면 그 값을 누적하는 프로그램을 작성하세요.\n예시\n입력: 3\napple 2\nbanana 3\napple 5\n출력: apple 7\nbanana 3",
              explanation: "이 문제는 파이썬의 딕셔너리를 사용하여 주어진 키와 값을 누적하는 방법을 연습하는 것입니다. 입력으로 주어진 키에 대해 값을 누적하고, 최종적으로 각 키와 누적된 값을 출력하는 방식입니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "2\norange 4\norange 6",
                  expected: "orange 10"
                },
                {
                  stdin: "4\ngrape 1\ngrape 2\nkiwi 3\nkiwi 1",
                  expected: "grape 3\nkiwi 4"
                },
                {
                  stdin: "5\nmango 5\nmango 5\nmango 5\npeach 2\npeach 3",
                  expected: "mango 15\npeach 5",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u5-l1-c3",
              conceptTags: [
                "dict"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 문자열에서 각 단어의 빈도수를 세고, 그 결과를 딕셔너리 형태로 반환하는 프로그램을 작성하세요.\n예시\n입력: apple banana apple orange banana apple\n출력: {'apple': 3, 'banana': 2, 'orange': 1}",
              explanation: "이 문제는 주어진 문자열을 공백으로 나누어 단어 리스트를 만든 후, 각 단어의 빈도수를 세기 위해 딕셔너리를 사용합니다. 딕셔너리의 키는 단어, 값은 그 단어의 빈도수입니다. 반복문을 통해 각 단어의 빈도수를 계산하고, 최종적으로 딕셔너리를 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "hello world hello",
                  expected: "{'hello': 2, 'world': 1}"
                },
                {
                  stdin: "python is fun python is great",
                  expected: "{'python': 2, 'is': 2, 'fun': 1, 'great': 1}"
                },
                {
                  stdin: "coding is fun coding is great coding",
                  expected: "{'coding': 3, 'is': 2, 'fun': 1, 'great': 1}",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "py-u6",
      order: 6,
      title: "유닛 6 · 예외 처리",
      description: "예외를 처리해 프로그램이 죽지 않게 만들기",
      lessons: [
        {
          id: "py-u6-l1",
          title: "try-except",
          challenges: [
            {
              id: "py-u6-l1-c1",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 숫자를 입력받아 정수로 변환하려고 합니다. 사용자가 잘못된 값을 입력할 경우, 오류를 처리하여 '잘못된 입력입니다.'라는 메시지를 출력해야 합니다.\n예시\n입력: abc\n출력: 잘못된 입력입니다.",
              explanation: "이 문제는 사용자가 입력한 문자열을 정수로 변환하려고 시도합니다. 만약 변환이 실패하면 ValueError가 발생하고, 이때 except 블록이 실행되어 오류 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "123",
                  expected: "잘못된 입력이 아닙니다."
                },
                {
                  stdin: "abc",
                  expected: "잘못된 입력입니다."
                },
                {
                  stdin: "45.67",
                  expected: "잘못된 입력입니다.",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u6-l1-c2",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 두 개의 숫자를 입력받아 첫 번째 숫자를 두 번째 숫자로 나누는 프로그램을 작성하세요. 두 번째 숫자가 0일 경우, '0으로 나눌 수 없습니다.'라는 메시지를 출력해야 합니다.\n예시\n입력: 10\n0\n출력: 0으로 나눌 수 없습니다.",
              explanation: "이 문제는 사용자가 입력한 두 숫자를 나누는 간단한 프로그램을 작성하는 것입니다. 사용자가 0으로 나누려고 할 때 발생하는 ZeroDivisionError를 try-except 블록을 사용하여 처리합니다. 0으로 나누는 경우에는 적절한 오류 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10\n2",
                  expected: "5.0"
                },
                {
                  stdin: "15\n3",
                  expected: "5.0"
                },
                {
                  stdin: "20\n0",
                  expected: "0으로 나눌 수 없습니다.",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u6-l1-c3",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 두 개의 숫자를 입력받아 나눗셈을 수행합니다. 나누는 수가 0일 경우 오류를 처리하고, 항상 완료 메시지를 출력해야 합니다.\n예시\n입력: 10\n2\n출력: 5.0\n완료되었습니다.",
              explanation: "이 코드는 사용자가 입력한 두 숫자를 나누고, 0으로 나누는 경우를 처리하기 위해 try-except-finally 블록을 사용합니다. 나누는 수가 0이면 오류 메시지를 출력하고, 마지막에 항상 '완료되었습니다.'라는 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10\n2",
                  expected: "5.0\n완료되었습니다."
                },
                {
                  stdin: "5\n0",
                  expected: "오류: 0으로 나눌 수 없습니다.\n완료되었습니다."
                },
                {
                  stdin: "15\n3",
                  expected: "5.0\n완료되었습니다.",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "py-u7",
      order: 7,
      title: "유닛 7 · 재귀 함수",
      description: "함수가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "py-u7-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "py-u7-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 정수 n의 팩토리얼을 계산하는 재귀 함수를 작성하세요. 팩토리얼은 n!로 표기되며, n! = n × (n-1)! 입니다. 0!은 1로 정의됩니다.\n예시\n입력: 5\n출력: 120",
              explanation: "이 코드는 재귀 함수를 사용하여 팩토리얼을 계산합니다. n이 0일 때 1을 반환하고, 그렇지 않으면 n과 n-1의 팩토리얼을 곱하여 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u7-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 n에 대해 n번째 피보나치 수를 구하는 재귀 함수를 작성하세요. 피보나치 수열은 0번째와 1번째 수가 각각 0과 1이며, 이후의 수는 이전 두 수의 합으로 정의됩니다.\n예시\n입력: 5\n출력: 5",
              explanation: "이 문제는 재귀 함수를 사용하여 피보나치 수를 계산하는 방법을 연습하는 것입니다. 피보나치 수열은 0과 1로 시작하며, 각 수는 이전 두 수의 합으로 정의됩니다. 재귀 함수를 통해 이 정의를 코드로 구현할 수 있습니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u7-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "python",
              question: "재귀 함수를 사용하여 1부터 n까지의 합을 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 코드는 재귀 함수를 사용하여 1부터 n까지의 합을 계산합니다. 기본 사례로 n이 1일 때 1을 반환하고, 그렇지 않으면 n과 n-1까지의 합을 재귀적으로 더합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "py-u8",
      order: 8,
      title: "유닛 8 · 클래스 기초",
      description: "데이터와 동작을 객체로 묶어보기",
      lessons: [
        {
          id: "py-u8-l1",
          title: "클래스와 객체",
          challenges: [
            {
              id: "py-u8-l1-c1",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "python",
              question: "학생의 이름과 나이를 속성으로 가지는 Student 클래스를 정의하고, 인스턴스를 생성하여 속성을 출력하는 프로그램을 작성하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동\n나이: 20",
              explanation: "이 문제는 학생의 이름과 나이를 속성으로 가지는 Student 클래스를 정의하는 것입니다. 인스턴스를 생성한 후, 해당 인스턴스의 속성을 출력하는 방법을 배우게 됩니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수\n나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희\n나이: 30"
                },
                {
                  stdin: "박지민\n18",
                  expected: "이름: 박지민\n나이: 18",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u8-l1-c2",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "python",
              question: "사각형의 면적을 계산하는 클래스를 작성하세요. 이 클래스는 폭과 높이를 속성으로 가지고 있으며, 면적을 계산하는 메서드를 포함해야 합니다.\n예시\n입력: 5 10\n출력: 50",
              explanation: "이 문제는 클래스와 메서드를 사용하여 사각형의 면적을 계산하는 방법을 배우는 것입니다. 사용자는 폭과 높이를 입력하고, 클래스의 메서드를 통해 면적을 계산하여 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3 4",
                  expected: "12"
                },
                {
                  stdin: "7 2",
                  expected: "14"
                },
                {
                  stdin: "10 10",
                  expected: "100",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u8-l1-c3",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "python",
              question: "학생의 이름과 나이를 저장하는 학생 클래스를 만드세요. 생성자(__init__)를 사용하여 초기값을 설정하고, 학생의 정보를 출력하는 메서드도 추가하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동, 나이: 20",
              explanation: "이 문제는 학생 정보를 저장하는 클래스를 만들고, 생성자를 통해 초기값을 설정하는 연습입니다. 학생의 이름과 나이를 입력받아 객체를 생성하고, 해당 정보를 출력하는 메서드를 통해 객체의 속성을 확인할 수 있습니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수, 나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희, 나이: 30"
                },
                {
                  stdin: "박지민\n18",
                  expected: "이름: 박지민, 나이: 18",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "py-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "리스트를 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "py-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "py-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 숫자 리스트를 오름차순으로 정렬하여 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 1 4 1 5\n출력: 1 1 3 4 5",
              explanation: "이 문제는 주어진 리스트를 정렬하는 간단한 문제입니다. 파이썬의 내장 함수인 sort()를 사용하여 리스트를 정렬하고, 결과를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\n9 2 5",
                  expected: "2 5 9"
                },
                {
                  stdin: "4\n7 3 3 1",
                  expected: "1 3 3 7"
                },
                {
                  stdin: "6\n10 20 10 30 20 10",
                  expected: "10 10 10 20 20 30",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 리스트에서 특정 값의 인덱스를 찾아 출력하는 프로그램을 작성하세요. 값이 리스트에 없으면 -1을 출력해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 프로그램은 리스트의 길이와 리스트의 요소, 찾고자 하는 값을 입력받습니다. 리스트에서 해당 값의 인덱스를 찾아 출력하며, 값이 없을 경우 -1을 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "6\n5 10 15 20 25 30\n10",
                  expected: "1",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 정수 리스트에서 두 번째로 큰 값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 1 4 2 5\n출력: 4",
              explanation: "이 문제는 리스트에서 두 번째로 큰 값을 찾는 문제입니다. 먼저 리스트에서 중복된 값을 제거하고, 정렬한 후 두 번째로 큰 값을 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "20"
                },
                {
                  stdin: "4\n7 5 9 1",
                  expected: "7"
                },
                {
                  stdin: "6\n15 22 8 42 35 10",
                  expected: "35",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "py-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "py-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "py-u10-l1-c1",
              conceptTags: [
                "dict",
                "string"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 문자열에서 각 단어의 빈도수를 세고, 그 결과를 딕셔너리 형태로 반환하는 프로그램을 작성하세요.\n예시\n입력: hello world hello\n출력: {'hello': 2, 'world': 1}",
              explanation: "이 문제는 주어진 문자열을 공백으로 나누어 각 단어의 빈도수를 세는 과정입니다. 문자열을 split() 메서드를 사용하여 단어 리스트로 만든 후, 반복문을 통해 딕셔너리에 각 단어의 빈도수를 저장합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "apple banana apple orange",
                  expected: "{'apple': 2, 'banana': 1, 'orange': 1}"
                },
                {
                  stdin: "dog cat dog cat dog",
                  expected: "{'dog': 3, 'cat': 2}"
                },
                {
                  stdin: "python java python python",
                  expected: "{'python': 3, 'java': 1}",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u10-l1-c2",
              conceptTags: [
                "function",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 정수 리스트에서 중복된 값을 제거하고, 중복이 제거된 리스트를 반환하는 함수를 작성하세요. 반환된 리스트는 오름차순으로 정렬되어야 합니다.\n예시\n입력: 5\n3 1 2 2 3\n출력: 1 2 3",
              explanation: "이 문제는 리스트에서 중복된 값을 제거하고 정렬하는 과정을 연습할 수 있는 문제입니다. set() 함수를 사용하여 중복을 제거하고, sort() 메서드를 사용하여 리스트를 정렬합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n3 1 2 2 3",
                  expected: "1 2 3"
                },
                {
                  stdin: "6\n5 5 5 5 5 5",
                  expected: "5"
                },
                {
                  stdin: "4\n4 3 2 1",
                  expected: "1 2 3 4",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u10-l1-c3",
              conceptTags: [
                "loop",
                "condition"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 정수를 입력받아, 1부터 그 정수까지의 모든 짝수의 합을 계산하는 프로그램을 작성하세요.\n예시\n입력: 10\n출력: 30",
              explanation: "이 문제는 반복문과 조건문을 사용하여 1부터 N까지의 정수를 순회하면서 짝수인 경우에만 합계를 계산하는 간단한 문제입니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10",
                  expected: "30"
                },
                {
                  stdin: "20",
                  expected: "110"
                },
                {
                  stdin: "5",
                  expected: "6",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
  ],
};

export const c: Course = {
  id: "c",
  title: "C 시스템",
  emoji: "⚙️",
  description: "포인터·메모리까지, 실행 없이는 못 배우는 것들",
  units: [
    {
      id: "c-u1",
      order: 1,
      title: "유닛 1 · C 기초",
      description: "printf, 자료형, 그리고 포인터 맛보기",
      lessons: [
        {
          id: "c-u1-l1",
          title: "printf와 자료형",
          challenges: [
            {
              id: "c-u1-l1-c1",
              conceptTags: ["output", "operator"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'printf("%d\\n", 3 + 4);',
              explanation: "%d 자리에 3+4의 계산 결과 7이 들어갑니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "3 + 4", correct: false },
                { id: "c", text: "34", correct: false },
                { id: "d", text: "%d", correct: false },
              ],
            },
            {
              id: "c-u1-l1-c2",
              conceptTags: ["output", "variable"],
              type: "FILL",
              language: "c",
              question: "정수 n을 출력하도록 형식 지정자를 넣으세요.",
              explanation:
                "정수 출력에는 %d 를 씁니다. %i 도 정수를 출력하므로 함께 정답으로 인정됩니다.",
              fillCode: 'int n = 42;\nprintf("{{0}}\\n", n);',
              fillAnswers: [["%d", "%i"]],
            },
            {
              id: "c-u1-l1-c3",
              conceptTags: ["operator", "variable"],
              type: "SELECT",
              language: "c",
              question: "C의 정수 나눗셈입니다. 출력은?",
              codeSnippet: 'printf("%d\\n", 7 / 2);',
              explanation:
                "정수끼리 나누면 소수점 아래는 버립니다. 7 / 2 = 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "3.5", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "2", correct: false },
              ],
            },
          ],
        },
        {
          id: "c-u1-l2",
          title: "포인터 첫걸음",
          challenges: [
            {
              id: "c-u1-l2-c1",
              conceptTags: ["pointer"],
              type: "SELECT",
              language: "c",
              question: "출력은?",
              codeSnippet: 'int x = 10;\nint *p = &x;\nprintf("%d\\n", *p);',
              explanation:
                "p는 x의 주소를 가리키고, *p 는 그 주소가 담은 값(10)입니다.",
              options: [
                { id: "a", text: "10", correct: true },
                { id: "b", text: "x의 주소값", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "&x", correct: false },
              ],
            },
            {
              id: "c-u1-l2-c2",
              conceptTags: ["output"],
              type: "PARSONS",
              language: "c",
              question: "Hi 를 출력하는 완전한 C 프로그램이 되도록 순서를 맞추세요.",
              explanation:
                "헤더 포함 → main 시작 → 출력 → 반환 → 닫기 순서입니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "int main(void) {",
                '    printf("Hi\\n");',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u1-l2-c3",
              conceptTags: ["memory"],
              type: "SELECT",
              language: "c",
              question: "malloc 으로 할당한 메모리를 해제하는 함수는?",
              explanation:
                "C에서는 malloc/calloc 으로 얻은 메모리를 free() 로 돌려줘야 누수가 없습니다.",
              options: [
                { id: "a", text: "free()", correct: true, code: true },
                { id: "b", text: "delete", correct: false, code: true },
                { id: "c", text: "clear()", correct: false, code: true },
                { id: "d", text: "remove()", correct: false, code: true },
              ],
            },
          ],
        },
        {
          id: "c-u1-l3",
          title: "직접 실행하기",
          challenges: [
            {
              id: "c-u1-l3-c1",
              conceptTags: ["output", "io"],
              type: "WRITE",
              language: "c",
              question:
                "두 정수를 입력받아(공백으로 구분) 그 합을 출력하는 프로그램을 작성하세요.",
              explanation:
                'scanf("%d %d", &a, &b) 로 두 수를 읽고, printf("%d\\n", a + b) 로 출력하면 됩니다.',
              starterCode:
                "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-4 4", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u1-l3-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "1부터 n까지의 합을 출력해야 하는데 결과가 이상합니다. 버그를 고치세요.",
              explanation:
                "반복문의 조건이 i < n 이면 n 자신이 더해지지 않습니다. i <= n 이어야 합니다.",
              starterCode:
                "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int sum = 0;\n    for (int i = 1; i < n; i++) {  // ← 버그\n        sum += i;\n    }\n    printf(\"%d\\n\", sum);\n    return 0;\n}\n",
              testCases: [
                { stdin: "5", expected: "15" },
                { stdin: "10", expected: "55" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-u2",
      order: 2,
      title: "유닛 2 · 배열과 반복",
      description: "여러 값을 배열에 담고, 중첩 반복문으로 다루기",
      lessons: [
        {
          id: "c-u2-l1",
          title: "배열 기초",
          challenges: [
            {
              id: "c-u2-l1-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "c",
              question: "출력은?",
              codeSnippet: 'int arr[4] = {1, 2, 3, 4};\nprintf("%d\\n", arr[3]);',
              explanation: "배열 인덱스는 0부터 시작하므로 arr[3]은 네 번째 값인 4입니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "쓰레기 값", correct: false },
              ],
            },
            {
              id: "c-u2-l1-c2",
              conceptTags: ["list"],
              type: "FILL",
              language: "c",
              question: "배열의 세 번째 원소(인덱스 2)를 출력하도록 빈칸을 채우세요.",
              explanation: "인덱스는 0부터 시작하므로 세 번째 원소는 인덱스 2입니다.",
              fillCode: 'int arr[3] = {10, 20, 30};\nprintf("%d\\n", arr[{{0}}]);',
              fillAnswers: [["2"]],
            },
            {
              id: "c-u2-l1-c3",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 5개를 입력받아(공백으로 구분) 배열에 저장한 뒤, 그 총합을 출력하는 프로그램을 작성하세요.",
              explanation:
                "for 문으로 scanf 를 5번 반복해 배열을 채우고, 더한 값을 printf 로 출력하면 됩니다.",
              starterCode:
                "#include <stdio.h>\n\nint main(void) {\n    int arr[5];\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "15" },
                { stdin: "10 20 30 40 50", expected: "150" },
                { stdin: "0 0 0 0 0", expected: "0", hidden: true },
              ],
            },
          ],
        },
        {
          id: "c-u2-l2",
          title: "중첩 반복문",
          challenges: [
            {
              id: "c-u2-l2-c1",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "c",
              question: "다음 코드는 총 몇 번 출력되나요?",
              codeSnippet:
                'for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        printf("%d\\n", i * j);\n    }\n}',
              explanation: "바깥 반복 3번 × 안쪽 반복 2번 = 6번 출력됩니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "5", correct: false },
              ],
            },
            {
              id: "c-u2-l2-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "구구단처럼 n단을 1부터 n까지 출력해야 하는데, 마지막 줄(n x n)이 빠집니다. 버그를 고치세요.",
              explanation: "반복 조건이 i < n 이면 n 자신이 빠집니다. i <= n 이어야 합니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i < n; i++) {  // ← 버그\n        printf("%d x %d = %d\\n", n, i, n * i);\n    }\n    return 0;\n}\n',
              testCases: [{ stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9" }],
            },
            {
              id: "c-u2-l2-c3",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 n을 입력받아, '*' 로 이루어진 n × n 정사각형을 출력하세요 (한 줄에 n개씩, n줄).",
              explanation: "바깥 반복문으로 줄 수를, 안쪽 반복문으로 한 줄에 찍을 개수를 제어합니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n',
              testCases: [
                { stdin: "3", expected: "***\n***\n***" },
                { stdin: "1", expected: "*" },
                { stdin: "2", expected: "**\n**", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-u3",
      order: 3,
      title: "유닛 3 · 문자열 처리",
      description: "char 배열로 문자열을 다루는 법",
      lessons: [
        {
          id: "c-u3-l1",
          title: "문자열 기초",
          challenges: [
            {
              id: "c-u3-l1-c1",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 문자열을 입력받아 그 문자열을 거꾸로 뒤집어서 출력하는 프로그램을 작성하세요.\n예시\n입력: hello\n출력: olleh",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 받아서, 문자열의 길이를 계산한 후, 그 길이를 기반으로 거꾸로 출력합니다. for 루프를 사용하여 문자열의 끝에서부터 시작하여 첫 글자까지 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "world",
                  expected: "dlrow"
                },
                {
                  stdin: "CodingGoring",
                  expected: "gniroGgnidoC"
                },
                {
                  stdin: "OpenAI",
                  expected: "IAnepO",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u3-l1-c2",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "두 개의 문자열을 입력받아 strcmp 함수를 사용하여 두 문자열이 같은지 비교하고 결과를 출력하세요.\n예시\n입력: hello\nhello\n출력: 같습니다",
              explanation: "이 문제는 두 문자열을 입력받아 strcmp 함수를 사용하여 비교하는 방법을 배우는 것입니다. strcmp 함수는 두 문자열이 같으면 0을 반환하므로, 이를 이용해 조건문으로 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "apple\napple",
                  expected: "같습니다"
                },
                {
                  stdin: "banana\norange",
                  expected: "다릅니다"
                },
                {
                  stdin: "test\nTest",
                  expected: "다릅니다",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u3-l1-c3",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 문자열에서 특정 문자가 몇 번 등장하는지 세는 프로그램을 작성하세요.\n예시\n입력: hello world\nl\n출력: 3",
              explanation: "이 프로그램은 사용자로부터 문자열과 특정 문자를 입력받고, 문자열을 반복하여 특정 문자가 몇 번 등장하는지 세는 방식으로 작동합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "programming in c\nm",
                  expected: "2"
                },
                {
                  stdin: "banana\nn",
                  expected: "2"
                },
                {
                  stdin: "hello world\nx",
                  expected: "0",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u4",
      order: 4,
      title: "유닛 4 · 함수",
      description: "코드를 함수로 나눠 재사용하기",
      lessons: [
        {
          id: "c-u4-l1",
          title: "함수 정의",
          challenges: [
            {
              id: "c-u4-l1-c1",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "두 정수를 입력받아 그 중에서 최댓값을 반환하는 함수를 정의하세요.\n예시\n입력: 5 10\n출력: 10",
              explanation: "이 문제는 두 정수를 비교하여 더 큰 값을 반환하는 함수를 구현하는 것입니다. max 함수는 두 정수를 인자로 받아서 조건 연산자를 사용하여 최댓값을 결정합니다. main 함수에서는 사용자로부터 두 정수를 입력받고, max 함수를 호출하여 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3 7",
                  expected: "7"
                },
                {
                  stdin: "15 10",
                  expected: "15"
                },
                {
                  stdin: "-5 -3",
                  expected: "-3",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u4-l1-c2",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수가 소수인지 판별하는 함수를 정의하세요. 소수는 1과 자기 자신만으로 나누어 떨어지는 1보다 큰 자연수입니다.\n예시\n입력: 7\n출력: Yes",
              explanation: "이 문제는 주어진 정수가 소수인지 아닌지를 판단하는 함수를 만드는 것입니다. 'is_prime' 함수는 입력된 정수가 소수인지 확인하고, main 함수에서 사용자로부터 입력을 받아 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "No"
                },
                {
                  stdin: "10",
                  expected: "No"
                },
                {
                  stdin: "13",
                  expected: "Yes",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u4-l1-c3",
              conceptTags: [
                "function",
                "pointer"
              ],
              type: "WRITE",
              language: "c",
              question: "두 개의 정수를 입력받아 서로 교환하는 함수를 정의하세요. 포인터를 사용하여 두 수의 값을 교환해야 합니다.\n예시\n입력: 5 10\n출력: 10 5",
              explanation: "이 문제는 포인터를 사용하여 두 변수의 값을 교환하는 함수를 구현하는 것입니다. swap 함수는 두 개의 포인터를 매개변수로 받아서, 각 포인터가 가리키는 값들을 서로 교환합니다. main 함수에서는 두 정수를 입력받고, swap 함수를 호출하여 교환한 후 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3 7",
                  expected: "7 3"
                },
                {
                  stdin: "-1 1",
                  expected: "1 -1"
                },
                {
                  stdin: "0 0",
                  expected: "0 0",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u5",
      order: 5,
      title: "유닛 5 · 구조체",
      description: "여러 데이터를 하나로 묶는 struct",
      lessons: [
        {
          id: "c-u5-l1",
          title: "구조체 기초",
          challenges: [
            {
              id: "c-u5-l1-c1",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "c",
              question: "구조체를 사용하여 학생의 이름과 나이를 저장하고 출력하는 프로그램을 작성하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동, 나이: 20",
              explanation: "이 프로그램은 구조체를 사용하여 학생의 이름과 나이를 저장하고, 입력받은 값을 출력하는 간단한 예제입니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수, 나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희, 나이: 30"
                },
                {
                  stdin: "박지민\n15",
                  expected: "이름: 박지민, 나이: 15",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u5-l1-c2",
              conceptTags: [
                "oop",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "여러 명의 학생 점수를 입력받아 각 학생의 점수를 합산하여 출력하는 프로그램을 작성하세요. 학생의 수는 10명으로 제한합니다.\n예시\n입력: 3\n홍길동 85\n김철수 90\n이영희 78\n\n출력: 홍길동: 85\n김철수: 90\n이영희: 78\n",
              explanation: "이 프로그램은 학생의 수와 각 학생의 이름 및 점수를 입력받아 구조체 배열을 사용하여 저장합니다. 이후 각 학생의 이름과 점수를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "2\n최민수 60\n박지민 70\n",
                  expected: "최민수: 60\n박지민: 70\n"
                },
                {
                  stdin: "5\n이순신 100\n강감찬 95\n유관순 88\n세종대왕 92\n김구 85\n",
                  expected: "이순신: 100\n강감찬: 95\n유관순: 88\n세종대왕: 92\n김구: 85\n"
                },
                {
                  stdin: "1\n홍길동 50\n",
                  expected: "홍길동: 50\n",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u5-l1-c3",
              conceptTags: [
                "oop",
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "두 개의 좌표(x1, y1)와(x2, y2)가 주어질 때, 이 두 좌표 사이의 거리를 계산하는 함수를 작성하세요. 거리 계산에는 수학 라이브러리의 sqrt 함수를 사용해야 합니다.\n예시\n입력: 1 2\n4 6\n출력: 5.00",
              explanation: "이 문제는 C 언어의 구조체와 함수를 사용하여 두 점 사이의 거리를 계산하는 방법을 배우는 데 도움을 줍니다. 구조체를 사용하여 점의 좌표를 저장하고, 함수를 통해 두 점 사이의 거리를 계산합니다. 이 과정에서 sqrt와 pow 함수를 사용하여 수학적 계산을 수행합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "0 0\n3 4",
                  expected: "5.00"
                },
                {
                  stdin: "-1 -1\n1 1",
                  expected: "2.83"
                },
                {
                  stdin: "100 100\n200 200",
                  expected: "141.42",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u6",
      order: 6,
      title: "유닛 6 · 동적 메모리 심화",
      description: "malloc과 free로 크기가 정해지지 않은 데이터 다루기",
      lessons: [
        {
          id: "c-u6-l1",
          title: "malloc과 free",
          challenges: [
            {
              id: "c-u6-l1-c1",
              conceptTags: [
                "memory"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 정수 배열의 크기를 입력받고, 동적으로 메모리를 할당하여 배열을 생성한 후, 배열의 모든 요소의 합계를 구하세요. 마지막으로 할당한 메모리를 해제해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n출력: 15",
              explanation: "이 문제는 사용자가 입력한 정수 배열의 크기만큼 메모리를 동적으로 할당하고, 입력받은 정수들을 배열에 저장한 후, 배열의 합계를 계산하는 방법을 배우는 데 도움을 줍니다. malloc을 사용하여 메모리를 할당하고, free를 사용하여 해제하는 것이 중요합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "60"
                },
                {
                  stdin: "4\n-1 -2 -3 -4",
                  expected: "-10"
                },
                {
                  stdin: "2\n100 200",
                  expected: "300",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u6-l1-c2",
              conceptTags: [
                "memory"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 입력받은 개수만큼의 정수를 동적으로 할당한 배열에 저장하고, 그 배열의 평균을 계산하여 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n10 20 30 40 50\n출력: 30.00",
              explanation: "이 프로그램은 먼저 사용자가 입력한 정수 N을 읽고, malloc을 사용하여 N개의 정수를 저장할 수 있는 배열을 동적으로 할당합니다. 이후 사용자가 입력한 N개의 정수를 배열에 저장하고, 배열의 모든 요소를 더한 후 평균을 계산하여 소수점 이하 두 자리까지 출력합니다. 마지막으로 동적으로 할당한 메모리를 해제합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n1 2 3",
                  expected: "2.00"
                },
                {
                  stdin: "4\n10 20 30 40",
                  expected: "25.00"
                },
                {
                  stdin: "2\n-10 10",
                  expected: "0.00",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u6-l1-c3",
              conceptTags: [
                "memory",
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 입력받은 문자열을 동적으로 메모리에 할당하여 복사한 후, 복사된 문자열을 출력하는 프로그램을 작성하세요.\n예시\n입력: 안녕하세요\n출력: 안녕하세요",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 동적으로 메모리에 할당하여 복사합니다. 'malloc'을 사용하여 메모리를 할당하고, 'strcpy'를 사용하여 문자열을 복사한 후, 복사된 문자열을 출력합니다. 마지막으로 'free'를 사용하여 할당한 메모리를 해제합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "안녕하세요",
                  expected: "안녕하세요"
                },
                {
                  stdin: "CodingGoring",
                  expected: "CodingGoring"
                },
                {
                  stdin: "동적 메모리 할당",
                  expected: "동적 메모리 할당",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u7",
      order: 7,
      title: "유닛 7 · 재귀 함수",
      description: "함수가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "c-u7-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "c-u7-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "c",
              question: "재귀 함수를 사용하여 주어진 정수의 팩토리얼을 계산하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 120",
              explanation: "이 프로그램은 재귀 함수를 사용하여 주어진 정수 N의 팩토리얼을 계산합니다. 팩토리얼은 N이 0일 때 1이며, 그 외의 경우 N과 N-1의 팩토리얼을 곱한 값입니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u7-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "c",
              question: "재귀 함수를 사용하여 n번째 피보나치 수를 구하는 프로그램을 작성하세요. 피보나치 수열은 다음과 같이 정의됩니다: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) (n >= 2).\n예시\n입력: 5\n출력: 5",
              explanation: "이 프로그램은 재귀 함수를 사용하여 n번째 피보나치 수를 계산합니다. 기본 케이스로 n이 0 또는 1일 때의 값을 반환하고, 그 외의 경우에는 n-1과 n-2의 피보나치 수를 합산하여 결과를 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "6",
                  expected: "8",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u7-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "c",
              question: "재귀 함수를 사용하여 1부터 n까지의 합을 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 프로그램은 재귀 함수를 사용하여 1부터 n까지의 합을 계산합니다. 함수 sum은 n이 1일 때 1을 반환하고, 그렇지 않으면 n과 sum(n-1)의 합을 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u8",
      order: 8,
      title: "유닛 8 · 포인터 심화",
      description: "포인터와 배열의 관계 이해하기",
      lessons: [
        {
          id: "c-u8-l1",
          title: "포인터와 배열",
          challenges: [
            {
              id: "c-u8-l1-c1",
              conceptTags: [
                "pointer",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열의 원소를 포인터를 사용하여 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 1\n2\n3\n4\n5",
              explanation: "이 프로그램은 먼저 사용자로부터 배열의 크기 n을 입력받고, n개의 정수를 배열에 저장합니다. 그 다음, 포인터 ptr를 사용하여 배열의 각 원소를 출력합니다. 포인터를 이용해 배열 원소에 접근하는 방법을 연습할 수 있습니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "10\n20\n30"
                },
                {
                  stdin: "4\n-1 0 1 2",
                  expected: "-1\n0\n1\n2"
                },
                {
                  stdin: "2\n100 200",
                  expected: "100\n200",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u8-l1-c2",
              conceptTags: [
                "pointer",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열의 모든 요소의 합계를 계산하는 프로그램을 작성하세요. 포인터를 사용하여 배열을 순회해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n출력: 15",
              explanation: "이 프로그램은 먼저 배열의 크기를 입력받고, 그 다음 배열의 요소를 입력받습니다. 포인터를 사용하여 배열을 순회하며 각 요소를 더하여 최종 합계를 계산합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "60"
                },
                {
                  stdin: "4\n-1 -2 -3 -4",
                  expected: "-10"
                },
                {
                  stdin: "2\n100 200",
                  expected: "300",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u8-l1-c3",
              conceptTags: [
                "pointer",
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "포인터를 이용하여 주어진 정수 배열의 합을 구하는 함수를 작성하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 15",
              explanation: "이 문제에서는 포인터를 사용하여 배열의 합을 구하는 함수를 작성합니다. sumArray 함수는 포인터를 통해 배열을 받아와 각 요소를 더하여 합을 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "60"
                },
                {
                  stdin: "4\n-1 -2 -3 -4",
                  expected: "-10"
                },
                {
                  stdin: "2\n1000 -1000",
                  expected: "0",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "배열을 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "c-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "c-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘을 구현하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "버블 정렬 알고리즘은 배열을 반복적으로 순회하면서 인접한 두 요소를 비교하여 정렬하는 방식입니다. 이 코드는 배열의 크기를 입력받고, 배열을 버블 정렬로 정렬한 후 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n3 1 2",
                  expected: "1 2 3"
                },
                {
                  stdin: "4\n4 4 4 4",
                  expected: "4 4 4 4"
                },
                {
                  stdin: "6\n10 -1 2 0 5 3",
                  expected: "-1 0 2 3 5 10",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열에서 특정 값을 선형 탐색을 통해 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 출력하고, 존재하지 않으면 -1을 출력합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 프로그램은 배열의 크기와 요소를 입력받고, 사용자가 찾고자 하는 값을 배열에서 선형 탐색을 통해 찾습니다. 배열을 처음부터 끝까지 순회하면서 해당 값이 발견되면 인덱스를 출력하고, 끝까지 탐색한 후에도 발견되지 않으면 -1을 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "6\n7 8 9 10 11 12\n10",
                  expected: "3",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정렬된 배열에서 특정 값을 이진 탐색을 사용하여 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 출력하고, 존재하지 않으면 -1을 출력해야 합니다.\n예시\n입력: 5\n1 3 5 7 9\n5\n출력: 2",
              explanation: "이 프로그램은 주어진 정렬된 배열에서 이진 탐색 알고리즘을 사용하여 특정 값을 찾습니다. 이진 탐색은 배열을 반으로 나누어 검색 범위를 줄여가며 값을 찾는 효율적인 방법입니다. 배열의 중간 값을 확인하고, 찾고자 하는 값과 비교하여 검색 범위를 조정합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "5\n1 3 5 7 9\n3",
                  expected: "1"
                },
                {
                  stdin: "6\n2 4 6 8 10 12\n11",
                  expected: "-1"
                },
                {
                  stdin: "7\n10 20 30 40 50 60 70\n70",
                  expected: "6",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "c-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "c-u10-l1-c1",
              conceptTags: [
                "oop",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "학생의 이름과 성적을 저장하고, 평균 성적을 계산하여 출력하는 프로그램을 작성하세요. 학생의 정보는 구조체를 사용하여 저장하고, 여러 학생의 정보를 배열로 관리합니다.\n예시\n입력: 3\n홍길동 85\n이순신 90\n강감찬 78\n출력: 84.33",
              explanation: "이 프로그램은 구조체를 사용하여 학생의 이름과 성적을 저장하고, 배열을 통해 여러 학생의 정보를 관리합니다. 입력된 성적을 모두 더한 후, 학생 수로 나누어 평균을 계산하고, 소수점 이하 두 자리까지 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "2\n김철수 95\n박영희 85",
                  expected: "90.00"
                },
                {
                  stdin: "4\n최민수 100\n이영희 70\n정수빈 80\n한지민 90",
                  expected: "85.00"
                },
                {
                  stdin: "5\n정우성 60\n이정재 70\n김태리 80\n송중기 90\n전지현 100",
                  expected: "80.00",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u10-l1-c2",
              conceptTags: [
                "function",
                "pointer"
              ],
              type: "WRITE",
              language: "c",
              question: "두 정수를 입력받아 최대 공약수를 구하는 함수를 작성하세요. 이 함수는 포인터를 사용하여 결과를 반환해야 합니다.\n예시\n입력: 36 60\n출력: 12",
              explanation: "이 코드는 두 수의 최대 공약수를 구하기 위해 유클리드 알고리즘을 사용합니다. gcd 함수는 포인터를 통해 결과를 반환하며, main 함수에서 입력을 받고 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "36 60",
                  expected: "12"
                },
                {
                  stdin: "48 18",
                  expected: "6"
                },
                {
                  stdin: "101 10",
                  expected: "1",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u10-l1-c3",
              conceptTags: [
                "loop",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열에서 최대값과 최소값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 -1 4 2 -5\n출력: 4 -5",
              explanation: "이 프로그램은 먼저 배열의 크기를 입력받고, 그 다음 배열의 각 요소를 입력받습니다. 반복문을 사용하여 배열의 최대값과 최소값을 찾고, 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n1 2 3",
                  expected: "3 1"
                },
                {
                  stdin: "4\n-10 -20 -30 -40",
                  expected: "-10 -40"
                },
                {
                  stdin: "6\n0 0 0 0 0 0",
                  expected: "0 0",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
  ],
};

export const java: Course = {
  id: "java",
  title: "자바 입문",
  emoji: "☕",
  description: "실행하며 배우는 자바 기초",
  units: [
    {
      id: "java-u1",
      order: 1,
      title: "유닛 1 · 자바 첫 걸음",
      description: "출력·변수부터 조건문까지, 그리고 실제 실행 채점",
      lessons: [
        {
          id: "java-u1-l1",
          title: "출력과 변수",
          challenges: [
            {
              id: "java-u1-l1-c1",
              conceptTags: ["output"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: 'System.out.println("코드런");',
              explanation:
                "System.out.println() 은 괄호 안의 값을 출력하고 줄을 바꿉니다. 큰따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코드런", correct: true },
                { id: "b", text: '"코드런"', correct: false },
                { id: "c", text: "System.out.println(코드런)", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u1-l1-c2",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "int x = 5, y = 3;\nSystem.out.println(x * y);",
              explanation: "int 끼리의 곱셈입니다. 5 × 3 = 15.",
              options: [
                { id: "a", text: "15", correct: true },
                { id: "b", text: "8", correct: false },
                { id: "c", text: "53", correct: false },
                { id: "d", text: "x * y", correct: false },
              ],
            },
            {
              id: "java-u1-l1-c3",
              conceptTags: ["variable", "operator"],
              type: "FILL",
              language: "java",
              question: "정수 두 개를 더한 값이 출력되도록 빈칸을 채우세요.",
              explanation: "int 변수 두 개를 더할 때는 + 연산자를 씁니다.",
              fillCode:
                "int a = 4, b = 6;\nSystem.out.println(a {{0}} b);",
              fillAnswers: [["+"]],
            },
          ],
        },
        {
          id: "java-u1-l2",
          title: "조건문과 실행",
          challenges: [
            {
              id: "java-u1-l2-c1",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "java",
              question: "x = 7 일 때 아래 코드의 출력은?",
              codeSnippet:
                'if (x % 2 == 0) {\n    System.out.println("짝");\n} else {\n    System.out.println("홀");\n}',
              explanation: "7 % 2 는 1 이라 0이 아니므로 else 로 갑니다.",
              options: [
                { id: "a", text: "홀", correct: true },
                { id: "b", text: "짝", correct: false },
                { id: "c", text: "7", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "java-u1-l2-c2",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "java",
              question:
                "정수를 입력받아 짝수면 '짝수', 홀수면 '홀수'를 출력해야 하는데 항상 '홀수'만 나옵니다. 고치세요.",
              explanation:
                "나머지를 2로 나눈 값을 0과 비교해야 합니다. = 은 대입, == 이 비교입니다. 여기서는 조건이 뒤집혀 있으니 % 2 == 0 으로 고치면 됩니다.",
              starterCode:
                'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n % 2 == 1) {  // ← 버그\n            System.out.println("짝수");\n        } else {\n            System.out.println("홀수");\n        }\n    }\n}\n',
              testCases: [
                { stdin: "4", expected: "짝수" },
                { stdin: "7", expected: "홀수" },
                { stdin: "10", expected: "짝수", hidden: true },
              ],
            },
            {
              id: "java-u1-l2-c3",
              conceptTags: ["output", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 두 개를 입력받아(공백으로 구분) 그 합을 출력하는 프로그램을 완성하세요.",
              explanation:
                "Scanner 의 nextInt() 로 두 수를 읽고, System.out.println() 으로 합을 출력하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-4 4", expected: "0", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "java-u2",
      order: 2,
      title: "유닛 2 · 반복문과 배열",
      description: "반복문으로 값을 여러 번 처리하고, 배열에 담아 관리하기",
      lessons: [
        {
          id: "java-u2-l1",
          title: "반복문",
          challenges: [
            {
              id: "java-u2-l1-c1",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "java",
              question: "다음 코드에서 마지막으로 출력되는 값은?",
              codeSnippet:
                "for (int i = 1; i <= 3; i++) {\n    System.out.println(i * i);\n}",
              explanation: "i 가 1, 2, 3 일 때 각각 1, 4, 9 를 출력하고 멈춥니다. 마지막은 9.",
              options: [
                { id: "a", text: "9", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "6", correct: false },
                { id: "d", text: "1", correct: false },
              ],
            },
            {
              id: "java-u2-l1-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "java",
              question:
                "구구단처럼 n단을 1부터 n까지 출력해야 하는데, 마지막 줄(n x n)이 빠집니다. 버그를 고치세요.",
              explanation: "반복 조건이 i < n 이면 n 자신이 빠집니다. i <= n 이어야 합니다.",
              starterCode:
                'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 1; i < n; i++) {  // ← 버그\n            System.out.println(n + " x " + i + " = " + (n * i));\n        }\n    }\n}\n',
              testCases: [{ stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9" }],
            },
            {
              id: "java-u2-l1-c3",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 n을 입력받아 1부터 n까지의 합을 출력하세요.",
              explanation: "반복문을 돌며 sum 에 i 를 계속 더하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5", expected: "15" },
                { stdin: "10", expected: "55" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
          ],
        },
        {
          id: "java-u2-l2",
          title: "배열",
          challenges: [
            {
              id: "java-u2-l2-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "int[] arr = {3, 6, 9};\nSystem.out.println(arr.length);",
              explanation: ".length 는 배열의 원소 개수입니다. 3개이므로 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "9", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "{3, 6, 9}", correct: false },
              ],
            },
            {
              id: "java-u2-l2-c2",
              conceptTags: ["list"],
              type: "FILL",
              language: "java",
              question: "배열의 두 번째 원소(인덱스 1)를 출력하도록 빈칸을 채우세요.",
              explanation: "인덱스는 0부터 시작하므로 두 번째 원소는 인덱스 1입니다.",
              fillCode: "int[] arr = {10, 20, 30};\nSystem.out.println(arr[{{0}}]);",
              fillAnswers: [["1"]],
            },
            {
              id: "java-u2-l2-c3",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 3개를 입력받아(공백으로 구분) 배열에 저장한 뒤, 그 중 최댓값을 출력하세요.",
              explanation:
                "배열에 값을 채운 뒤, 첫 번째 값을 기준으로 더 큰 값이 나올 때마다 최댓값을 갱신하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[] arr = new int[3];\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 7 5", expected: "7" },
                { stdin: "1 2 3", expected: "3" },
                { stdin: "9 2 4", expected: "9", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "java-u3",
      order: 3,
      title: "유닛 3 · 문자열",
      description: "String 메서드로 문자열 다루기",
      lessons: [
        {
          id: "java-u3-l1",
          title: "String 메서드",
          challenges: [
            {
              id: "java-u3-l1-c1",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 문자열의 길이를 출력하고, 문자열의 첫 번째 문자를 출력하는 프로그램을 작성하세요.\n예시\n입력: Hello, World!\n출력: 13\nH",
              explanation: "이 프로그램은 사용자가 입력한 문자열의 길이를 계산하고, 첫 번째 문자를 추출하여 출력합니다. length() 메서드는 문자열의 길이를 반환하고, charAt(0) 메서드는 문자열의 첫 번째 문자를 반환합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "CodingGoring",
                  expected: "12\nC"
                },
                {
                  stdin: "Java Programming",
                  expected: "16\nJ"
                },
                {
                  stdin: "12345",
                  expected: "5\n1",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u3-l1-c3",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 문자열의 대문자는 소문자로, 소문자는 대문자로 변환하는 프로그램을 작성하세요.\n예시\n입력: HelloWorld\n출력: hELLOWORLD",
              explanation: "이 프로그램은 입력된 문자열을 하나씩 검사하여 대문자는 소문자로, 소문자는 대문자로 변환합니다. 변환된 문자는 StringBuilder를 사용하여 최종 결과 문자열을 만듭니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "JavaProgramming",
                  expected: "jAVApROGRAMMING"
                },
                {
                  stdin: "CodingGoring",
                  expected: "cODINGgORING"
                },
                {
                  stdin: "OpenAI",
                  expected: "oPENai",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u3-l1-c4",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 문자열의 대문자를 소문자로, 소문자를 대문자로 변환하여 출력하는 프로그램을 작성하세요.\n예시\n입력: Hello World\n출력: hELLO wORLD",
              explanation: "이 프로그램은 입력된 문자열을 문자 단위로 순회하며, 각 문자가 대문자인지 소문자인지를 확인합니다. 대문자일 경우 소문자로 변환하고, 소문자일 경우 대문자로 변환하여 결과 문자열을 생성합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "Coding is Fun",
                  expected: "cODING IS fUN"
                },
                {
                  stdin: "JAVA Programming",
                  expected: "java pROGRAMMING"
                },
                {
                  stdin: "OpenAI ChatGPT",
                  expected: "oPENai cHATgpt",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u4",
      order: 4,
      title: "유닛 4 · 메서드",
      description: "코드를 메서드로 나눠 재사용하기",
      lessons: [
        {
          id: "java-u4-l1",
          title: "메서드 정의",
          challenges: [
            {
              id: "java-u4-l1-c1",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "java",
              question: "두 개의 정수를 입력받아 그 중에서 최댓값을 반환하는 메서드를 정의하세요.\n예시\n입력: 5\n10\n출력: 10",
              explanation: "이 문제는 두 정수를 입력받고, 그 중에서 큰 값을 반환하는 메서드를 만드는 것입니다. 조건문을 사용하여 두 수를 비교하고 최댓값을 결정합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n7",
                  expected: "7"
                },
                {
                  stdin: "-5\n-3",
                  expected: "-3"
                },
                {
                  stdin: "0\n0",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u4-l1-c2",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "java",
              question: "정수가 소수인지 판별하는 메서드를 정의하세요. 소수란 1과 자기 자신만으로 나누어 떨어지는 1보다 큰 자연수입니다.\n예시\n입력: 7\n출력: YES",
              explanation: "이 코드는 주어진 정수 N이 소수인지 확인하는 메서드를 정의합니다. 1보다 큰 정수에 대해서만 소수 판별을 수행하며, 2부터 N의 제곱근까지 나누어 떨어지는 수가 있는지를 확인하여 소수를 판별합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "NO"
                },
                {
                  stdin: "10",
                  expected: "NO"
                },
                {
                  stdin: "13",
                  expected: "YES",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u4-l1-c3",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 길이를 사용하여 사각형과 원의 면적을 계산하는 메서드를 작성하세요. 두 개의 메서드를 오버로딩하여 같은 이름을 사용하되, 매개변수의 수와 타입이 다르게 하세요.\n예시\n입력: 5\n3.0\n출력: 25\n28.27",
              explanation: "이 문제에서는 메서드 오버로딩을 사용하여 같은 이름의 메서드를 정의하고, 매개변수의 타입에 따라 다른 기능을 수행하게 합니다. 'calculateArea' 메서드는 정수 매개변수를 받을 때 사각형의 면적을 계산하고, 실수 매개변수를 받을 때 원의 면적을 계산합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "10\n5.0",
                  expected: "100\n78.54"
                },
                {
                  stdin: "7\n2.5",
                  expected: "49\n19.63"
                },
                {
                  stdin: "15\n4.0",
                  expected: "225\n50.27",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u5",
      order: 5,
      title: "유닛 5 · 클래스와 객체",
      description: "데이터와 동작을 객체로 묶어보기",
      lessons: [
        {
          id: "java-u5-l1",
          title: "클래스 기초",
          challenges: [
            {
              id: "java-u5-l1-c1",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "java",
              question: "학생 정보를 저장하는 클래스를 정의하고, 생성자를 사용하여 인스턴스 필드를 초기화한 후, 해당 정보를 출력하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동, 나이: 20",
              explanation: "이 문제는 학생 정보를 저장하는 클래스를 만들고, 생성자를 통해 이름과 나이를 초기화한 후, 이를 출력하는 간단한 프로그램을 작성하는 것입니다. Scanner 클래스를 사용하여 입력을 받고, Student 클래스의 display 메서드를 통해 정보를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수, 나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희, 나이: 30"
                },
                {
                  stdin: "박지민\n22",
                  expected: "이름: 박지민, 나이: 22",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u5-l1-c2",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "java",
              question: "사각형의 너비와 높이를 입력받아 면적을 계산하는 클래스를 작성하세요. 이 클래스에는 면적을 계산하는 메서드가 포함되어야 합니다.\n예시\n입력: 5 10\n출력: 50",
              explanation: "이 문제는 사각형의 면적을 계산하는 클래스를 작성하는 것입니다. 사용자는 너비와 높이를 입력하고, 프로그램은 이 값을 이용해 면적을 계산하여 출력합니다. Rectangle 클래스는 너비와 높이를 필드로 가지고 있으며, area() 메서드를 통해 면적을 계산합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3 4",
                  expected: "12"
                },
                {
                  stdin: "7 2",
                  expected: "14"
                },
                {
                  stdin: "10 10",
                  expected: "100",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u5-l1-c3",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "java",
              question: "사람의 이름과 나이를 초기화하는 생성자를 가진 클래스를 작성하고, 이를 통해 객체를 생성하여 정보를 출력하는 프로그램을 작성하세요.\n예시\n입력: 홍길동\n25\n출력: 이름: 홍길동, 나이: 25",
              explanation: "이 프로그램은 Person 클래스를 정의하고, 생성자를 통해 이름과 나이를 초기화합니다. main 메서드에서 사용자로부터 입력을 받아 객체를 생성하고, displayInfo 메서드를 호출하여 정보를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "김철수\n30",
                  expected: "이름: 김철수, 나이: 30"
                },
                {
                  stdin: "이영희\n45",
                  expected: "이름: 이영희, 나이: 45"
                },
                {
                  stdin: "박지민\n20",
                  expected: "이름: 박지민, 나이: 20",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u6",
      order: 6,
      title: "유닛 6 · 2차원 배열",
      description: "행과 열로 이루어진 배열 다루기",
      lessons: [
        {
          id: "java-u6-l1",
          title: "2차원 배열 기초",
          challenges: [
            {
              id: "java-u6-l1-c1",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자가 입력한 행과 열의 인덱스를 기반으로 2차원 배열에서 값을 출력하는 프로그램을 작성하세요.\n예시\n입력: 3 3\n1 2 3\n4 5 6\n7 8 9\n1 1\n출력: 5",
              explanation: "이 프로그램은 사용자로부터 2차원 배열의 크기와 요소를 입력받고, 특정 인덱스에 해당하는 값을 출력합니다. 배열을 생성하고, 중첩된 반복문을 사용하여 값을 입력받고, 마지막으로 인덱스를 통해 해당 값을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "2 2\n10 20\n30 40\n0 1",
                  expected: "20"
                },
                {
                  stdin: "3 3\n1 1 1\n2 2 2\n3 3 3\n2 0",
                  expected: "3"
                },
                {
                  stdin: "4 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n17 18 19 20\n3 3",
                  expected: "20",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u6-l1-c2",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 2차원 배열의 모든 원소를 합산하는 프로그램을 작성하세요.\n예시\n입력: 2 3\n1 2 3\n4 5 6\n출력: 21",
              explanation: "이 문제는 2차원 배열의 모든 원소를 합산하는 간단한 문제입니다. 먼저 배열의 크기를 입력받고, 그 다음 각 원소를 입력받아 합산합니다. 마지막으로 합산된 값을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "2 2\n1 2\n3 4",
                  expected: "10"
                },
                {
                  stdin: "3 3\n1 1 1\n1 1 1\n1 1 1",
                  expected: "9"
                },
                {
                  stdin: "1 5\n-1 -2 -3 -4 -5",
                  expected: "-15",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u6-l1-c3",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 2차원 배열에서 각 행의 합을 계산하고, 그 중 최댓값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n출력: 51",
              explanation: "이 문제는 2차원 배열의 각 행의 합을 계산하고, 그 중 가장 큰 값을 찾는 것입니다. 먼저 배열을 입력받고, 각 행의 합을 계산하여 최댓값을 업데이트합니다. 최종적으로 최댓값을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "2 3\n1 2 3\n4 5 6",
                  expected: "15"
                },
                {
                  stdin: "4 2\n1 2\n-1 -2\n3 4\n5 6",
                  expected: "11"
                },
                {
                  stdin: "3 3\n10 20 30\n40 50 60\n70 80 90",
                  expected: "240",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u7",
      order: 7,
      title: "유닛 7 · 예외 처리",
      description: "예외를 처리해 프로그램이 죽지 않게 만들기",
      lessons: [
        {
          id: "java-u7-l1",
          title: "try-catch",
          challenges: [
            {
              id: "java-u7-l1-c1",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자로부터 숫자 문자열을 입력받아 정수로 변환하는 프로그램을 작성하세요. 만약 입력된 문자열이 숫자로 변환할 수 없는 경우, '잘못된 입력입니다'라는 메시지를 출력해야 합니다.\n예시\n입력: 123\n출력: 123",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 정수로 변환하려고 시도합니다. 변환이 실패하면 NumberFormatException이 발생하고, 이 경우 catch 블록에서 오류 메시지를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "456",
                  expected: "456"
                },
                {
                  stdin: "abc",
                  expected: "잘못된 입력입니다"
                },
                {
                  stdin: "78.9",
                  expected: "잘못된 입력입니다",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u7-l1-c2",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열에서 특정 인덱스의 값을 출력하는 프로그램을 작성하세요. 만약 인덱스가 배열의 범위를 초과하면 '인덱스 초과'라는 메시지를 출력해야 합니다. 이 문제는 try-catch를 사용하여 오류를 처리해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 4",
              explanation: "이 코드는 배열의 크기와 원소를 입력받고, 사용자가 요청한 인덱스의 값을 출력합니다. 만약 사용자가 입력한 인덱스가 배열의 범위를 초과하면, try-catch 문을 사용하여 '인덱스 초과'라는 메시지를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30\n1",
                  expected: "20"
                },
                {
                  stdin: "4\n5 15 25 35\n5",
                  expected: "인덱스 초과"
                },
                {
                  stdin: "2\n-1 0\n0",
                  expected: "-1",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u7-l1-c3",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자로부터 정수를 입력받아, 입력이 유효한지 검증하는 프로그램을 작성하세요. 입력이 유효하지 않은 경우, 예외를 처리하여 오류 메시지를 출력해야 합니다. 프로그램은 항상 마지막에 '프로그램 종료'라는 메시지를 출력해야 합니다.\n예시\n입력: 10\n출력: 10\n프로그램 종료",
              explanation: "이 프로그램은 Scanner를 사용하여 사용자로부터 입력을 받습니다. try 블록 내에서 정수를 입력받고, 만약 입력이 유효하지 않으면 catch 블록에서 예외를 처리하여 오류 메시지를 출력합니다. finally 블록에서는 항상 '프로그램 종료'라는 메시지를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "20",
                  expected: "20\n프로그램 종료"
                },
                {
                  stdin: "abc",
                  expected: "유효하지 않은 입력입니다. 정수를 입력하세요.\n프로그램 종료"
                },
                {
                  stdin: "-5",
                  expected: "-5\n프로그램 종료",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u8",
      order: 8,
      title: "유닛 8 · 재귀 함수",
      description: "메서드가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "java-u8-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "java-u8-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "java",
              question: "자연수 N이 주어졌을 때, N의 팩토리얼을 계산하는 재귀 메서드를 작성하세요. 팩토리얼은 N!로 표시되며, N! = N × (N-1)! 입니다. 단, 0! = 1입니다.\n예시\n입력: 5\n출력: 120",
              explanation: "이 코드는 재귀 메서드를 사용하여 팩토리얼을 계산합니다. 입력된 자연수 N이 0일 경우 1을 반환하고, 그렇지 않으면 N과 (N-1)의 팩토리얼을 곱하여 결과를 반환합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u8-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "java",
              question: "재귀 메서드를 사용하여 n번째 피보나치 수를 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 5",
              explanation: "이 프로그램은 재귀적으로 피보나치 수열을 계산합니다. n이 0일 때 0을 반환하고, n이 1일 때 1을 반환합니다. 그 외의 경우에는 n-1과 n-2의 피보나치 수를 더하여 반환합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u8-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "java",
              question: "재귀 메서드를 사용하여 1부터 n까지의 합을 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 프로그램은 재귀 메서드 sum을 사용하여 1부터 n까지의 합을 계산합니다. n이 1일 때 1을 반환하고, 그 외의 경우에는 n과 n-1까지의 합을 재귀적으로 호출하여 더합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "배열을 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "java-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "java-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘을 구현하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "버블 정렬은 인접한 두 원소를 비교하여 정렬하는 간단한 알고리즘입니다. 이 문제에서는 사용자가 입력한 배열을 버블 정렬을 통해 오름차순으로 정렬한 후 결과를 출력하도록 합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n3 1 2",
                  expected: "1 2 3"
                },
                {
                  stdin: "4\n4 3 2 1",
                  expected: "1 2 3 4"
                },
                {
                  stdin: "6\n10 -1 2 0 5 -5",
                  expected: "-5 -1 0 2 5 10",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열에서 특정 값을 선형 탐색을 통해 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 출력하고, 존재하지 않으면 -1을 출력합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 문제는 선형 탐색을 통해 배열에서 특정 값을 찾는 방법을 학습하는 데 도움이 됩니다. 배열을 순회하면서 각 요소와 찾고자 하는 값을 비교하여 일치하는 경우 인덱스를 출력합니다. 일치하는 값이 없으면 -1을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "6\n7 8 9 10 11 12\n10",
                  expected: "3",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "정렬된 배열에서 특정 값을 이진 탐색을 이용하여 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 반환하고, 존재하지 않으면 -1을 반환해야 합니다.\n예시\n입력: 5\n1 3 5 7 9\n5\n출력: 2",
              explanation: "이 프로그램은 이진 탐색 알고리즘을 사용하여 정렬된 배열에서 특정 값을 찾습니다. 배열의 중간 값을 확인하고, 찾고자 하는 값과 비교하여 탐색 범위를 반으로 줄여나갑니다. 이진 탐색은 O(log N) 시간 복잡도를 가지므로 효율적입니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "5\n1 3 5 7 9\n5",
                  expected: "2"
                },
                {
                  stdin: "6\n2 4 6 8 10 12\n7",
                  expected: "-1"
                },
                {
                  stdin: "7\n1 2 3 4 5 6 7\n1",
                  expected: "0",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "java-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "java-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "java-u10-l1-c2",
              conceptTags: [
                "function",
                "loop"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자로부터 정수를 입력받아 그 합계를 계산하는 메서드를 작성하세요. 사용자는 0을 입력할 때까지 정수를 입력해야 하며, 0은 합계에 포함되지 않습니다.\n예시\n입력: 5\n10\n-3\n0\n출력: 12",
              explanation: "이 프로그램은 Scanner 클래스를 사용하여 사용자로부터 정수를 입력받습니다. 반복문을 통해 0이 입력될 때까지 각 입력된 정수를 합산합니다. 0이 입력되면 반복문을 종료하고 최종 합계를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "1\n2\n3\n4\n0",
                  expected: "10"
                },
                {
                  stdin: "10\n-5\n-5\n0",
                  expected: "0"
                },
                {
                  stdin: "0",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u10-l1-c3",
              conceptTags: [
                "condition",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열에서 최대값과 최소값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 -1 4 2 0\n출력: 4\n-1",
              explanation: "이 프로그램은 주어진 정수 배열에서 최대값과 최소값을 찾기 위해 두 개의 변수를 사용합니다. 배열을 순회하면서 각 요소를 비교하여 최대값과 최소값을 업데이트합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n1 2 3",
                  expected: "3\n1"
                },
                {
                  stdin: "4\n-5 -10 -3 -1",
                  expected: "-1\n-10"
                },
                {
                  stdin: "6\n10 20 30 40 50 60",
                  expected: "60\n10",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u10-l1-c4",
              conceptTags: [
                "oop",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "여러 학생의 점수를 배열에 저장하고, 그 점수들의 평균을 계산하는 프로그램을 작성하세요. 학생의 수와 각 학생의 점수는 사용자로부터 입력받습니다.\n예시\n입력: 5\n80 90 70 85 95\n출력: 84.00",
              explanation: "이 프로그램은 학생의 수와 점수를 입력받아 배열에 저장한 후, 평균을 계산하여 출력합니다. 평균 계산은 점수의 합을 점수의 개수로 나누어 수행합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n60 70 80",
                  expected: "70.00"
                },
                {
                  stdin: "4\n100 90 80 70",
                  expected: "85.00"
                },
                {
                  stdin: "2\n50 50",
                  expected: "50.00",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
  ],
};

export const javascript: Course = {
  id: "javascript",
  title: "자바스크립트 입문",
  emoji: "🟨",
  description: "실행하며 배우는 자바스크립트 기초",
  units: [
    {
      id: "js-u1",
      order: 1,
      title: "유닛 1 · JS 첫 걸음",
      description: "console.log·변수부터 배열·함수까지, 브라우저에서 바로 실행",
      lessons: [
        {
          id: "js-u1-l1",
          title: "출력과 변수",
          challenges: [
            {
              id: "js-u1-l1-c1",
              conceptTags: ["output"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'console.log("코드런");',
              explanation:
                "console.log() 는 괄호 안의 값을 출력합니다. 따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코드런", correct: true },
                { id: "b", text: '"코드런"', correct: false },
                { id: "c", text: "console.log(코드런)", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u1-l1-c2",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const x = "3";\nconsole.log(x + 4);',
              explanation:
                "문자열 \"3\" 에 숫자를 + 하면 문자열로 이어 붙습니다. '3' + 4 → '34'.",
              options: [
                { id: "a", text: "34", correct: true },
                { id: "b", text: "7", correct: false },
                { id: "c", text: "'3' + 4", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u1-l1-c3",
              conceptTags: ["output"],
              type: "WRITE",
              language: "javascript",
              question:
                "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요:  안녕, 코드런!",
              explanation: 'console.log("안녕, 코드런!") 처럼 문자열을 그대로 출력하면 됩니다.',
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "안녕, 코드런!" }],
            },
          ],
        },
        {
          id: "js-u1-l2",
          title: "배열과 반복",
          challenges: [
            {
              id: "js-u1-l2-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const a = [10, 20, 30];\nconsole.log(a.length);",
              explanation: ".length 는 배열의 길이입니다. 원소가 3개이므로 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "30", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "[10, 20, 30]", correct: false },
              ],
            },
            {
              id: "js-u1-l2-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question:
                "0부터 n-1까지 한 줄에 하나씩 출력해야 하는데 n까지 출력됩니다. 고치세요.",
              explanation:
                "반복 조건이 i <= n 이면 n 도 포함됩니다. i < n 이어야 0부터 n-1까지 나옵니다.",
              starterCode:
                'const n = Number(input());\nfor (let i = 0; i <= n; i++) {  // ← 버그\n  console.log(i);\n}\n',
              testCases: [
                { stdin: "3", expected: "0\n1\n2" },
                { stdin: "1", expected: "0" },
                { stdin: "5", expected: "0\n1\n2\n3\n4", hidden: true },
              ],
            },
            {
              id: "js-u1-l2-c3",
              conceptTags: ["io", "operator"],
              type: "WRITE",
              language: "javascript",
              question:
                "한 줄에 공백으로 구분된 정수 두 개를 입력받아 그 합을 출력하세요. (input() 으로 한 줄을 읽을 수 있어요)",
              explanation:
                'input() 으로 "3 5" 같은 한 줄을 받아 split(" ") 로 나누고, Number() 로 바꿔 더하면 됩니다.',
              starterCode:
                '// input() 이 한 줄을 문자열로 돌려줘요\nconst line = input();\n// 여기에 코드를 작성하세요\n',
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-4 4", expected: "0", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "js-u2",
      order: 2,
      title: "유닛 2 · 함수와 객체",
      description: "함수로 로직을 재사용하고, 객체로 여러 값을 묶어 관리하기",
      lessons: [
        {
          id: "js-u2-l1",
          title: "함수",
          challenges: [
            {
              id: "js-u2-l1-c1",
              conceptTags: ["function"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 4));",
              explanation: "add(3, 4) 는 3 + 4 를 계산해 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u2-l1-c2",
              conceptTags: ["function", "io"],
              type: "PARSONS",
              language: "javascript",
              question: "정수를 입력받아 2배로 만들어 출력하도록 줄 순서를 맞추세요.",
              explanation: "함수를 먼저 정의하고, 입력을 받은 뒤, 함수를 호출해 출력합니다.",
              parsonsLines: [
                "function double(n) {",
                "  return n * 2;",
                "}",
                "const x = Number(input());",
                "console.log(double(x));",
              ],
            },
            {
              id: "js-u2-l1-c3",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 n을 입력받아 n의 세제곱을 반환하는 함수 cube(n)을 작성하고, 그 결과를 출력하세요.",
              explanation: "함수 안에서 n * n * n 을 return 하면 됩니다.",
              starterCode:
                "function cube(n) {\n  // 여기에 코드를 작성하세요\n}\n\nconst n = Number(input());\nconsole.log(cube(n));\n",
              testCases: [
                { stdin: "3", expected: "27" },
                { stdin: "2", expected: "8" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
          ],
        },
        {
          id: "js-u2-l2",
          title: "객체 기초",
          challenges: [
            {
              id: "js-u2-l2-c1",
              conceptTags: ["variable"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const person = { name: "코리", age: 3 };\nconsole.log(person.name);',
              explanation: '객체의 속성은 점(.)으로 접근합니다. person.name 은 "코리"입니다.',
              options: [
                { id: "a", text: "코리", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "name", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u2-l2-c2",
              conceptTags: ["variable"],
              type: "FILL",
              language: "javascript",
              question: "객체의 score 속성을 출력하도록 빈칸을 채우세요.",
              explanation: "점 뒤에 속성 이름을 그대로 쓰면 됩니다.",
              fillCode: "const obj = { score: 90 };\nconsole.log(obj.{{0}});",
              fillAnswers: [["score"]],
            },
            {
              id: "js-u2-l2-c3",
              conceptTags: ["variable", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "user.name 을 출력해야 하는데 undefined 가 나옵니다. 버그를 고치세요.",
              explanation:
                "자바스크립트는 대소문자를 구분합니다. 객체에 정의된 속성은 name(소문자)이지 Name(대문자)이 아닙니다.",
              starterCode: 'const user = { name: "코드런" };\nconsole.log(user.Name);  // ← 버그\n',
              testCases: [{ expected: "코드런" }],
            },
          ],
        },
      ],
    },
    {
      id: "js-u3",
      order: 3,
      title: "유닛 3 · 배열 다루기",
      description: "배열에 값을 추가하고 정렬하기",
      lessons: [
        {
          id: "js-u3-l1",
          title: "배열 메서드",
          challenges: [
            {
              id: "js-u3-l1-c1",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 숫자들을 배열에 추가하고, 배열의 길이를 출력하는 프로그램을 작성하세요. 배열에 숫자를 추가할 때는 push() 메서드를 사용해야 합니다.\n예시\n입력: 3\n5 10 15\n출력: 3",
              explanation: "이 프로그램은 먼저 입력을 받아서 숫자의 개수 n과 숫자들을 배열에 추가합니다. push() 메서드를 사용하여 배열에 숫자를 추가한 후, 배열의 길이를 length 속성을 통해 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "2\n1 2",
                  expected: "2"
                },
                {
                  stdin: "5\n-1 0 1 2 3",
                  expected: "5"
                },
                {
                  stdin: "4\n10 20 30 40",
                  expected: "4",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u3-l1-c2",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 숫자 배열을 오름차순으로 정렬하여 출력하는 프로그램을 작성하세요. 입력은 한 줄에 공백으로 구분된 숫자들로 주어집니다.\n예시\n입력: 5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "이 문제는 자바스크립트의 배열 sort() 메서드를 사용하여 숫자 배열을 오름차순으로 정렬하는 방법을 배우는 것입니다. 입력을 받아서 공백으로 구분된 숫자를 배열로 변환하고, sort() 메서드를 사용하여 정렬한 후, 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10 2 5 1 3",
                  expected: "1 2 3 5 10"
                },
                {
                  stdin: "4 4 2 3 1",
                  expected: "1 2 3 4 4"
                },
                {
                  stdin: "7 9 2 6 5 3",
                  expected: "2 3 5 6 7 9",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u3-l1-c3",
              conceptTags: [
                "list",
                "algorithm"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열 배열에서 특정 문자열을 찾아 그 인덱스를 출력하는 프로그램을 작성하세요. 만약 문자열이 배열에 존재하지 않으면 -1을 출력해야 합니다.\n예시\n입력: 5\napple banana cherry date elderberry\ncherry\n출력: 2",
              explanation: "이 코드는 입력으로 주어진 배열과 찾고자 하는 문자열을 받아서 indexOf() 메서드를 사용하여 문자열의 인덱스를 찾습니다. 찾은 인덱스를 출력하고, 문자열이 배열에 없으면 -1을 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\ncat dog mouse\ndog",
                  expected: "1"
                },
                {
                  stdin: "4\nred green blue yellow\npurple",
                  expected: "-1"
                },
                {
                  stdin: "6\none two three four five six\nfive",
                  expected: "4",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u4",
      order: 4,
      title: "유닛 4 · 문자열 메서드",
      description: "문자열을 자르고 변환하기",
      lessons: [
        {
          id: "js-u4-l1",
          title: "문자열 다루기",
          challenges: [
            {
              id: "js-u4-l1-c1",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열의 길이를 출력하고, 문자열의 첫 번째 문자와 마지막 문자를 출력하는 프로그램을 작성하세요.\n예시\n입력: hello\n출력: 5\nh\no",
              explanation: "이 프로그램은 주어진 문자열의 길이를 구하고, 첫 번째 문자와 마지막 문자를 출력합니다. length 속성과 charAt 메서드를 사용하여 문자열을 처리합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "hello",
                  expected: "5\nh\no"
                },
                {
                  stdin: "CodingGoring",
                  expected: "12\nC\ng"
                },
                {
                  stdin: "JavaScript",
                  expected: "10\nJ\nt",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u4-l1-c3",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열을 입력받아 모든 문자를 대문자로 변환한 후, 다시 소문자로 변환하여 출력하는 프로그램을 작성하세요.\n예시\n입력: Hello World\n출력: HELLO WORLD\nhello world",
              explanation: "이 문제는 주어진 문자열을 대문자와 소문자로 변환하는 간단한 작업입니다. toUpperCase() 메서드를 사용하여 모든 문자를 대문자로 변환하고, toLowerCase() 메서드를 사용하여 모든 문자를 소문자로 변환합니다. 변환된 문자열은 각각 출력됩니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "CodingGoring",
                  expected: "CODINGGORING\ncodinggoring"
                },
                {
                  stdin: "JavaScript",
                  expected: "JAVASCRIPT\njavascript"
                },
                {
                  stdin: "OpenAI",
                  expected: "OPENAI\nopenai",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u4-l1-c4",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열의 대문자는 소문자로, 소문자는 대문자로 변환하여 출력하는 프로그램을 작성하세요.\n예시\n입력: HelloWorld\n출력: hELLOwORLD",
              explanation: "이 코드는 주어진 문자열을 한 글자씩 검사하여 대문자는 소문자로, 소문자는 대문자로 변환합니다. 변환된 결과는 최종적으로 출력됩니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "HelloWorld",
                  expected: "hELLOwORLD"
                },
                {
                  stdin: "CodingGoring",
                  expected: "cODINGgORING"
                },
                {
                  stdin: "JavaScript",
                  expected: "jAVAsCRIPT",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u5",
      order: 5,
      title: "유닛 5 · 조건문 심화",
      description: "삼항 연산자와 복합 조건 다루기",
      lessons: [
        {
          id: "js-u5-l1",
          title: "조건 표현식",
          challenges: [
            {
              id: "js-u5-l1-c1",
              conceptTags: [
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수가 짝수인지 홀수인지 판별하는 프로그램을 작성하세요. 삼항 연산자(?:)를 사용하여 결과를 출력해야 합니다.\n예시\n입력: 10\n출력: 짝수",
              explanation: "이 코드는 입력된 정수 N을 기준으로 짝수인지 홀수인지 판단합니다. N을 2로 나눈 나머지가 0이면 짝수, 그렇지 않으면 홀수입니다. 삼항 연산자를 사용하여 조건에 따라 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5",
                  expected: "홀수"
                },
                {
                  stdin: "14",
                  expected: "짝수"
                },
                {
                  stdin: "0",
                  expected: "짝수",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u5-l1-c2",
              conceptTags: [
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 숫자에 따라 그 숫자가 양수, 음수, 또는 0인지 판별하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 양수",
              explanation: "이 문제는 주어진 숫자가 양수인지 음수인지 또는 0인지 판별하는 간단한 조건문을 사용하는 연습입니다. 'if', 'else if', 'else' 구조를 사용하여 다양한 조건을 검사하는 방법을 배울 수 있습니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10",
                  expected: "양수"
                },
                {
                  stdin: "-3",
                  expected: "음수"
                },
                {
                  stdin: "0",
                  expected: "제로",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u5-l1-c3",
              conceptTags: [
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 두 개의 정수 A와 B에 대해, A가 10보다 크고 B가 20보다 작으면 '조건을 만족합니다'를 출력하고, A가 10보다 작거나 B가 20보다 크면 '조건을 만족하지 않습니다'를 출력하는 프로그램을 작성하세요.\n예시\n입력: 15 18\n출력: 조건을 만족합니다",
              explanation: "이 문제는 논리 연산자 &&와 ||를 사용하여 복합 조건을 판별하는 방법을 연습하는 것입니다. 주어진 두 정수 A와 B에 대해 각 조건을 확인하고 적절한 출력을 합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "15 18",
                  expected: "조건을 만족합니다"
                },
                {
                  stdin: "5 25",
                  expected: "조건을 만족하지 않습니다"
                },
                {
                  stdin: "12 22",
                  expected: "조건을 만족하지 않습니다",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u6",
      order: 6,
      title: "유닛 6 · 반복문 심화",
      description: "while과 중첩 반복문 다루기",
      lessons: [
        {
          id: "js-u6-l1",
          title: "while과 중첩 반복",
          challenges: [
            {
              id: "js-u6-l1-c1",
              conceptTags: [
                "loop"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수 n에 대해 1부터 n까지의 합을 구하는 프로그램을 작성하세요. while 반복문을 사용해야 합니다.\n예시\n입력: 5\n출력: 15",
              explanation: "이 프로그램은 while 반복문을 사용하여 1부터 n까지의 모든 정수를 더하여 합을 구합니다. 초기값을 0으로 설정한 sum 변수에 반복문을 통해 값을 더하고, i는 1부터 시작하여 n까지 증가합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "20",
                  expected: "210",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u6-l1-c2",
              conceptTags: [
                "loop"
              ],
              type: "WRITE",
              language: "javascript",
              question: "자바스크립트를 사용하여 1부터 9까지의 구구단을 출력하는 프로그램을 작성하세요. 각 단은 한 줄에 출력되어야 하며, 각 곱셈 결과는 공백으로 구분되어야 합니다.\n예시\n입력: (없음)\n출력: 1 x 1 = 1 1 x 2 = 2 1 x 3 = 3 1 x 4 = 4 1 x 5 = 5 1 x 6 = 6 1 x 7 = 7 1 x 8 = 8 1 x 9 = 9\n2 x 1 = 2 2 x 2 = 4 2 x 3 = 6 2 x 4 = 8 2 x 5 = 10 2 x 6 = 12 2 x 7 = 14 2 x 8 = 16 2 x 9 = 18\n3 x 1 = 3 3 x 2 = 6 3 x 3 = 9 3 x 4 = 12 3 x 5 = 15 3 x 6 = 18 3 x 7 = 21 3 x 8 = 24 3 x 9 = 27\n4 x 1 = 4 4 x 2 = 8 4 x 3 = 12 4 x 4 = 16 4 x 5 = 20 4 x 6 = 24 4 x 7 = 28 4 x 8 = 32 4 x 9 = 36\n5 x 1 = 5 5 x 2 = 10 5 x 3 = 15 5 x 4 = 20 5 x 5 = 25 5 x 6 = 30 5 x 7 = 35 5 x 8 = 40 5 x 9 = 45\n6 x 1 = 6 6 x 2 = 12 6 x 3 = 18 6 x 4 = 24 6 x 5 = 30 6 x 6 = 36 6 x 7 = 42 6 x 8 = 48 6 x 9 = 54\n7 x 1 = 7 7 x 2 = 14 7 x 3 = 21 7 x 4 = 28 7 x 5 = 35 7 x 6 = 42 7 x 7 = 49 7 x 8 = 56 7 x 9 = 63\n8 x 1 = 8 8 x 2 = 16 8 x 3 = 24 8 x 4 = 32 8 x 5 = 40 8 x 6 = 48 8 x 7 = 56 8 x 8 = 64 8 x 9 = 72\n9 x 1 = 9 9 x 2 = 18 9 x 3 = 27 9 x 4 = 36 9 x 5 = 45 9 x 6 = 54 9 x 7 = 63 9 x 8 = 72 9 x 9 = 81",
              explanation: "이 문제는 중첩 반복문을 사용하여 구구단을 출력하는 방법을 연습하는 것입니다. 외부 반복문은 단을 나타내고, 내부 반복문은 각 단의 곱셈을 수행하여 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  expected: "1 x 1 = 1 1 x 2 = 2 1 x 3 = 3 1 x 4 = 4 1 x 5 = 5 1 x 6 = 6 1 x 7 = 7 1 x 8 = 8 1 x 9 = 9\n2 x 1 = 2 2 x 2 = 4 2 x 3 = 6 2 x 4 = 8 2 x 5 = 10 2 x 6 = 12 2 x 7 = 14 2 x 8 = 16 2 x 9 = 18\n3 x 1 = 3 3 x 2 = 6 3 x 3 = 9 3 x 4 = 12 3 x 5 = 15 3 x 6 = 18 3 x 7 = 21 3 x 8 = 24 3 x 9 = 27\n4 x 1 = 4 4 x 2 = 8 4 x 3 = 12 4 x 4 = 16 4 x 5 = 20 4 x 6 = 24 4 x 7 = 28 4 x 8 = 32 4 x 9 = 36\n5 x 1 = 5 5 x 2 = 10 5 x 3 = 15 5 x 4 = 20 5 x 5 = 25 5 x 6 = 30 5 x 7 = 35 5 x 8 = 40 5 x 9 = 45\n6 x 1 = 6 6 x 2 = 12 6 x 3 = 18 6 x 4 = 24 6 x 5 = 30 6 x 6 = 36 6 x 7 = 42 6 x 8 = 48 6 x 9 = 54\n7 x 1 = 7 7 x 2 = 14 7 x 3 = 21 7 x 4 = 28 7 x 5 = 35 7 x 6 = 42 7 x 7 = 49 7 x 8 = 56 7 x 9 = 63\n8 x 1 = 8 8 x 2 = 16 8 x 3 = 24 8 x 4 = 32 8 x 5 = 40 8 x 6 = 48 8 x 7 = 56 8 x 8 = 64 8 x 9 = 72\n9 x 1 = 9 9 x 2 = 18 9 x 3 = 27 9 x 4 = 36 9 x 5 = 45 9 x 6 = 54 9 x 7 = 63 9 x 8 = 72 9 x 9 = 81"
                }
              ]
            },
            {
              id: "js-u6-l1-c3",
              conceptTags: [
                "loop",
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수가 소수인지 판별하는 함수를 작성하세요. 소수는 1과 자기 자신만으로 나누어 떨어지는 1보다 큰 자연수입니다.\n예시\n입력: 7\n출력: YES",
              explanation: "이 코드는 주어진 정수 N이 소수인지 판별합니다. 2부터 N의 제곱근까지의 모든 정수로 N을 나누어 떨어지는지 확인하여, 하나라도 나누어 떨어지면 소수가 아니므로 'NO'를 반환하고, 그렇지 않으면 'YES'를 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "11",
                  expected: "YES"
                },
                {
                  stdin: "15",
                  expected: "NO"
                },
                {
                  stdin: "1",
                  expected: "NO",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u7",
      order: 7,
      title: "유닛 7 · 재귀 함수",
      description: "함수가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "js-u7-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "js-u7-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수 n의 팩토리얼을 계산하는 재귀 함수를 작성하세요. 팩토리얼은 n!로 표현되며, n! = n × (n-1)!입니다. 기본적으로 0! = 1입니다.\n예시\n입력: 5\n출력: 120",
              explanation: "이 코드는 재귀 함수를 사용하여 팩토리얼을 계산합니다. n이 0일 때 1을 반환하고, 그 외의 경우 n과 n-1의 팩토리얼을 곱하여 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u7-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 n에 대해 n번째 피보나치 수를 구하는 재귀 함수를 작성하세요. 피보나치 수열은 0번째 항이 0, 1번째 항이 1이며, 그 이후의 항은 이전 두 항의 합으로 정의됩니다.\n예시\n입력: 5\n출력: 5",
              explanation: "이 코드는 피보나치 수를 재귀적으로 계산합니다. n이 0일 때는 0을 반환하고, n이 1일 때는 1을 반환합니다. 그 외의 경우에는 n-1과 n-2의 피보나치 수를 더하여 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "6",
                  expected: "8",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u7-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "javascript",
              question: "재귀 함수를 사용하여 1부터 n까지의 합을 구하는 함수를 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 함수는 재귀적으로 n이 1일 때까지 호출되며, 각 호출에서 n을 더하여 최종적으로 1부터 n까지의 합을 계산합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u8",
      order: 8,
      title: "유닛 8 · 예외 처리",
      description: "예외를 처리해 프로그램이 멈추지 않게 만들기",
      lessons: [
        {
          id: "js-u8-l1",
          title: "try-catch",
          challenges: [
            {
              id: "js-u8-l1-c1",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "javascript",
              question: "사용자로부터 입력받은 문자열을 숫자로 변환하는 프로그램을 작성하세요. 만약 변환할 수 없는 문자열이 입력되면, '변환 오류'라는 메시지를 출력해야 합니다. 자바스크립트의 try-catch 문을 사용하여 오류를 처리하세요.\n예시\n입력: 123abc\n출력: 변환 오류",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 숫자로 변환하려고 시도합니다. 변환이 실패하면 catch 블록에서 '변환 오류' 메시지를 출력합니다. try-catch 문을 사용하여 오류를 안전하게 처리합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "456",
                  expected: "456"
                },
                {
                  stdin: "abc123",
                  expected: "변환 오류"
                },
                {
                  stdin: "78.9",
                  expected: "78.9",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u8-l1-c3",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "javascript",
              question: "사용자로부터 숫자를 입력받아 그 숫자가 유효한지 검증하는 프로그램을 작성하세요. 입력이 유효한 경우 그 숫자를 출력하고, 유효하지 않은 경우 '유효하지 않은 입력'을 출력하세요. 이때, try-catch-finally 문을 사용하여 예외 처리를 구현해야 합니다.\n예시\n입력: 42\n출력: 42",
              explanation: "이 코드는 사용자가 입력한 값을 숫자로 변환하고, 변환이 실패할 경우 예외를 발생시킵니다. try-catch-finally 블록을 사용하여 예외를 처리하고, 유효한 입력일 경우 숫자를 출력하며, 유효하지 않은 경우 '유효하지 않은 입력' 메시지를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3.14",
                  expected: "3.14"
                },
                {
                  stdin: "abc",
                  expected: "유효하지 않은 입력"
                },
                {
                  stdin: "-10",
                  expected: "-10",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u8-l1-c4",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열이 JSON 형식인지 확인하고, 잘못된 경우 에러를 처리하는 프로그램을 작성하세요.\n예시\n입력: {\"name\":\"홍길동\",\"age\":30}\n출력: {\"name\":\"홍길동\",\"age\":30}",
              explanation: "이 문제는 JSON.parse() 메서드를 사용하여 주어진 문자열을 객체로 변환하는 방법을 배우는 것입니다. 잘못된 형식의 JSON 문자열이 주어지면 SyntaxError가 발생하므로, try-catch 문을 사용하여 에러를 처리합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "{\"name\":\"이순신\",\"age\":40}",
                  expected: "{\"name\":\"이순신\",\"age\":40}"
                },
                {
                  stdin: "{\"name\":\"김유신\",\"age\":}",
                  expected: "잘못된 JSON 형식입니다."
                },
                {
                  stdin: "{\"name\":\"강감찬\",\"age\":50,}",
                  expected: "잘못된 JSON 형식입니다.",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "배열을 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "js-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "js-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘을 구현하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "이 문제는 버블 정렬 알고리즘을 사용하여 배열을 오름차순으로 정렬하는 방법을 배울 수 있습니다. 버블 정렬은 인접한 두 요소를 비교하고 필요에 따라 교환하는 방식으로 동작합니다. 이 과정을 반복하여 모든 요소가 정렬될 때까지 진행합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\n3 1 2",
                  expected: "1 2 3"
                },
                {
                  stdin: "4\n4 4 4 4",
                  expected: "4 4 4 4"
                },
                {
                  stdin: "6\n10 5 3 2 8 1",
                  expected: "1 2 3 5 8 10",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열에서 특정 값을 선형 탐색을 통해 찾는 함수를 작성하세요. 값이 배열에 존재하면 그 인덱스를 반환하고, 존재하지 않으면 -1을 반환해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 코드는 배열에서 특정 값을 선형 탐색으로 찾습니다. 배열을 순회하면서 각 요소가 찾고자 하는 값과 일치하는지 확인하고, 일치하면 그 인덱스를 반환합니다. 배열의 끝까지 탐색한 후에도 값을 찾지 못하면 -1을 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "3\n5 15 25\n15",
                  expected: "1",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "정렬된 배열에서 특정 값을 찾기 위해 이진 탐색 알고리즘을 구현하세요.\n예시\n입력: 5\n1 3 5 7 9\n5\n출력: 2",
              explanation: "이진 탐색 알고리즘은 정렬된 배열에서 특정 값을 찾기 위해 배열의 중간 값을 비교하여 탐색 범위를 반으로 줄여 나가는 방법입니다. 이 코드는 입력으로 주어진 배열과 찾고자 하는 값을 바탕으로 이진 탐색을 수행하여 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n1 3 5 7 9\n3",
                  expected: "1"
                },
                {
                  stdin: "6\n2 4 6 8 10 12\n10",
                  expected: "4"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "js-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "js-u10-l1-c1",
              conceptTags: [
                "function",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열에서 중복된 값을 제거하고, 중복이 제거된 배열을 반환하는 함수를 작성하세요.\n예시\n입력: 5\n3 1 2 3 2\n출력: 1 2 3",
              explanation: "이 문제는 배열의 중복된 값을 제거하고 정렬하는 과정을 포함합니다. Set 객체를 사용하여 중복을 제거하고, sort 메서드를 사용하여 오름차순으로 정렬합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "6\n4 5 1 4 2 5",
                  expected: "1 2 4 5"
                },
                {
                  stdin: "4\n7 7 7 7",
                  expected: "7"
                },
                {
                  stdin: "3\n-1 -1 -1",
                  expected: "-1",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u10-l1-c2",
              conceptTags: [
                "loop"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 학생들의 점수를 포함한 객체 배열을 받아서 각 학생의 평균 점수를 계산하고, 평균 점수가 70 이상인 학생의 이름을 출력하는 프로그램을 작성하세요.\n예시\n입력: 3\n이순신:85,90,78\n강감찬:60,70,65\n홍길동:90,92,88\n출력: 이순신\n홍길동",
              explanation: "이 프로그램은 학생의 점수를 포함한 객체 배열을 입력받아 각 학생의 평균 점수를 계산합니다. 평균 점수가 70 이상인 학생의 이름을 배열에 추가하고, 최종적으로 그 이름들을 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "2\n김철수:80,75,90\n이영희:60,65,70",
                  expected: "김철수"
                },
                {
                  stdin: "3\n박지민:50,60,55\n최수빈:80,85,90\n이민호:70,75,80",
                  expected: "최수빈\n이민호"
                },
                {
                  stdin: "1\n정우성:100,95,90",
                  expected: "정우성",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u10-l1-c3",
              conceptTags: [
                "condition",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열에서 특정 숫자가 몇 번 나타나는지를 세는 함수를 작성하세요. 배열과 찾고자 하는 숫자를 입력으로 받아야 합니다.\n예시\n입력: 5\n1 2 3 2 4\n2\n출력: 2",
              explanation: "이 문제는 배열을 순회하면서 특정 숫자가 몇 번 나타나는지를 세는 간단한 문제입니다. 조건문을 사용하여 배열의 각 요소를 확인하고, 찾고자 하는 숫자와 일치할 경우 카운트를 증가시킵니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "4\n1 1 1 1\n1",
                  expected: "4"
                },
                {
                  stdin: "6\n2 3 2 5 2 6\n2",
                  expected: "3"
                },
                {
                  stdin: "3\n7 8 9\n10",
                  expected: "0",
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
  ],
};

export const courses: Course[] = [python, c, java, javascript];

/**
 * 온보딩 진단 테스트 문항 (01번 문서).
 * 실행 채점(WRITE/BUGFIX)은 시간이 오래 걸려 온보딩 이탈을 유발하므로 제외하고,
 * 출력 예측(SELECT)과 라인 재배열(PARSONS)만으로 구성한다.
 */
export const diagnosticChallenges: Record<Language, Challenge[]> = {
  python: [
    {
      id: "diag-py-1",
      conceptTags: ["operator"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "print(2 + 3 * 2)",
      explanation: "곱셈이 덧셈보다 먼저 계산됩니다. 3 * 2 = 6, 2 + 6 = 8.",
      options: [
        { id: "a", text: "8", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "12", correct: false },
        { id: "d", text: "2 + 3 * 2", correct: false },
      ],
    },
    {
      id: "diag-py-2",
      conceptTags: ["string", "variable"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: 'name = "코리"\nprint("안녕, " + name)',
      explanation: "+ 로 문자열을 이어 붙이면 '안녕, 코리' 가 됩니다.",
      options: [
        { id: "a", text: "안녕, 코리", correct: true },
        { id: "b", text: "안녕, name", correct: false },
        { id: "c", text: "안녕, + 코리", correct: false },
        { id: "d", text: "오류가 납니다", correct: false },
      ],
    },
    {
      id: "diag-py-3",
      conceptTags: ["loop"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "for i in range(3):\n    print(i)",
      explanation: "range(3)은 0, 1, 2를 순서대로 줍니다. 3은 포함되지 않습니다.",
      options: [
        { id: "a", text: "0 1 2 (줄바꿈으로 각각)", correct: true },
        { id: "b", text: "1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "c", text: "0 1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "d", text: "3", correct: false },
      ],
    },
    {
      id: "diag-py-4",
      conceptTags: ["condition"],
      type: "PARSONS",
      language: "python",
      question: "점수가 60점 이상이면 '합격'을, 아니면 '불합격'을 출력하도록 순서를 맞추세요.",
      explanation: "조건을 먼저 검사하고, if 블록과 else 블록을 들여쓰기로 구분합니다.",
      parsonsLines: [
        "score = 75",
        "if score >= 60:",
        '    print("합격")',
        "else:",
        '    print("불합격")',
      ],
    },
    {
      id: "diag-py-5",
      conceptTags: ["list"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "nums = [10, 20, 30]\nprint(nums[1])",
      explanation: "리스트 인덱스는 0부터 시작하므로 nums[1]은 두 번째 값인 20입니다.",
      options: [
        { id: "a", text: "20", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "30", correct: false },
        { id: "d", text: "[10, 20, 30]", correct: false },
      ],
    },
    {
      id: "diag-py-6",
      conceptTags: ["function"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "def double(n):\n    return n * 2\n\nprint(double(4) + 1)",
      explanation: "double(4)가 8을 반환하고, 거기에 1을 더해 9가 됩니다.",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "8", correct: false },
        { id: "d", text: "5", correct: false },
      ],
    },
  ],
  c: [
    {
      id: "diag-c-1",
      conceptTags: ["operator"],
      type: "SELECT",
      language: "c",
      question: "출력은?",
      codeSnippet: 'printf("%d\\n", 10 % 3);',
      explanation: "%는 나머지 연산자입니다. 10을 3으로 나눈 나머지는 1입니다.",
      options: [
        { id: "a", text: "1", correct: true },
        { id: "b", text: "3", correct: false },
        { id: "c", text: "3.33", correct: false },
        { id: "d", text: "0", correct: false },
      ],
    },
    {
      id: "diag-c-2",
      conceptTags: ["output", "variable"],
      type: "SELECT",
      language: "c",
      question: "실수(float)를 출력할 때 쓰는 형식 지정자는?",
      explanation: "%d는 정수, %f는 실수, %c는 문자, %s는 문자열에 씁니다.",
      options: [
        { id: "a", text: "%f", correct: true, code: true },
        { id: "b", text: "%d", correct: false, code: true },
        { id: "c", text: "%s", correct: false, code: true },
        { id: "d", text: "%c", correct: false, code: true },
      ],
    },
    {
      id: "diag-c-3",
      conceptTags: ["list"],
      type: "SELECT",
      language: "c",
      question: "출력은?",
      codeSnippet: 'int arr[3] = {5, 6, 7};\nprintf("%d\\n", arr[2]);',
      explanation: "배열 인덱스는 0부터 시작하므로 arr[2]는 세 번째 값인 7입니다.",
      options: [
        { id: "a", text: "7", correct: true },
        { id: "b", text: "6", correct: false },
        { id: "c", text: "5", correct: false },
        { id: "d", text: "쓰레기 값", correct: false },
      ],
    },
    {
      id: "diag-c-4",
      conceptTags: ["loop"],
      type: "PARSONS",
      language: "c",
      question: "0부터 2까지 출력하는 완전한 C 프로그램이 되도록 순서를 맞추세요.",
      explanation:
        "헤더 포함 → main 시작 → for 반복 → 반복 종료 → 반환 → main 닫기 순서입니다.",
      parsonsLines: [
        "#include <stdio.h>",
        "int main(void) {",
        "    for (int i = 0; i < 3; i++) {",
        '        printf("%d\\n", i);',
        "    }",
        "    return 0;",
        "}",
      ],
    },
    {
      id: "diag-c-5",
      conceptTags: ["pointer"],
      type: "SELECT",
      language: "c",
      question: "출력은?",
      codeSnippet: 'int x = 3;\nint *p = &x;\n*p = 9;\nprintf("%d\\n", x);',
      explanation:
        "p는 x를 가리키므로 *p = 9 는 x 자체를 9로 바꿉니다. 포인터의 핵심입니다.",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "3", correct: false },
        { id: "c", text: "x의 주소값", correct: false },
        { id: "d", text: "오류가 납니다", correct: false },
      ],
    },
    {
      id: "diag-c-6",
      conceptTags: ["memory"],
      type: "SELECT",
      language: "c",
      question: "malloc으로 할당한 메모리를 해제하지 않으면 생기는 문제는?",
      explanation:
        "해제하지 않은 메모리는 프로그램이 끝날 때까지 반환되지 않습니다. 이를 메모리 누수라고 합니다.",
      options: [
        { id: "a", text: "메모리 누수", correct: true },
        { id: "b", text: "컴파일 에러", correct: false },
        { id: "c", text: "무한 루프", correct: false },
        { id: "d", text: "아무 문제 없음", correct: false },
      ],
    },
  ],
  java: [
    {
      id: "diag-java-1",
      conceptTags: ["output"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet: 'System.out.println(2 + 3 * 2);',
      explanation: "곱셈이 덧셈보다 먼저입니다. 3 * 2 = 6, 2 + 6 = 8.",
      options: [
        { id: "a", text: "8", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "12", correct: false },
        { id: "d", text: "232", correct: false },
      ],
    },
    {
      id: "diag-java-2",
      conceptTags: ["variable", "operator"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet: 'String s = "코리";\nSystem.out.println("안녕, " + s);',
      explanation: "+ 로 문자열을 이어 붙이면 '안녕, 코리' 가 됩니다.",
      options: [
        { id: "a", text: "안녕, 코리", correct: true },
        { id: "b", text: "안녕, s", correct: false },
        { id: "c", text: "안녕, + 코리", correct: false },
        { id: "d", text: "컴파일 오류", correct: false },
      ],
    },
    {
      id: "diag-java-3",
      conceptTags: ["loop"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet:
        "for (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}",
      explanation: "i 가 0, 1, 2 일 때 각각 출력하고 3에서 멈춥니다.",
      options: [
        { id: "a", text: "0 1 2 (줄바꿈으로 각각)", correct: true },
        { id: "b", text: "1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "c", text: "0 1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "d", text: "3", correct: false },
      ],
    },
    {
      id: "diag-java-4",
      conceptTags: ["condition"],
      type: "PARSONS",
      language: "java",
      question: "점수가 60 이상이면 '합격'을, 아니면 '불합격'을 출력하도록 순서를 맞추세요.",
      explanation: "조건을 먼저 검사하고, if 블록과 else 블록을 중괄호로 구분합니다.",
      parsonsLines: [
        "int score = 75;",
        "if (score >= 60) {",
        '    System.out.println("합격");',
        "} else {",
        '    System.out.println("불합격");',
        "}",
      ],
    },
    {
      id: "diag-java-5",
      conceptTags: ["list"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet:
        "int[] arr = {5, 6, 7};\nSystem.out.println(arr[1]);",
      explanation: "배열 인덱스는 0부터 시작하므로 arr[1]은 두 번째 값인 6입니다.",
      options: [
        { id: "a", text: "6", correct: true },
        { id: "b", text: "5", correct: false },
        { id: "c", text: "7", correct: false },
        { id: "d", text: "{5, 6, 7}", correct: false },
      ],
    },
  ],
  javascript: [
    {
      id: "diag-js-1",
      conceptTags: ["operator"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet: "console.log(2 + 3 * 2);",
      explanation: "곱셈이 덧셈보다 먼저입니다. 3 * 2 = 6, 2 + 6 = 8.",
      options: [
        { id: "a", text: "8", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "12", correct: false },
        { id: "d", text: "232", correct: false },
      ],
    },
    {
      id: "diag-js-2",
      conceptTags: ["variable", "operator"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet: 'console.log("5" + 3);',
      explanation:
        '문자열 "5" 에 숫자를 + 하면 문자열로 이어 붙습니다. "5" + 3 → "53".',
      options: [
        { id: "a", text: "53", correct: true },
        { id: "b", text: "8", correct: false },
        { id: "c", text: "5 3", correct: false },
        { id: "d", text: "NaN", correct: false },
      ],
    },
    {
      id: "diag-js-3",
      conceptTags: ["list"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet: "const nums = [10, 20, 30];\nconsole.log(nums[1]);",
      explanation: "배열 인덱스는 0부터 시작하므로 nums[1]은 두 번째 값인 20입니다.",
      options: [
        { id: "a", text: "20", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "30", correct: false },
        { id: "d", text: "[10, 20, 30]", correct: false },
      ],
    },
    {
      id: "diag-js-4",
      conceptTags: ["condition"],
      type: "PARSONS",
      language: "javascript",
      question: "점수가 60 이상이면 '합격'을, 아니면 '불합격'을 출력하도록 순서를 맞추세요.",
      explanation: "조건을 먼저 검사하고, if 블록과 else 블록을 중괄호로 구분합니다.",
      parsonsLines: [
        "const score = 75;",
        "if (score >= 60) {",
        '  console.log("합격");',
        "} else {",
        '  console.log("불합격");',
        "}",
      ],
    },
    {
      id: "diag-js-5",
      conceptTags: ["function"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet:
        "function double(n) {\n  return n * 2;\n}\nconsole.log(double(4) + 1);",
      explanation: "double(4) 가 8을 반환하고, 거기에 1을 더해 9가 됩니다.",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "8", correct: false },
        { id: "d", text: "5", correct: false },
      ],
    },
  ],
};

/**
 * 진단 정답률 → 시작 지점.
 * 80%+ 3번째 유닛 / 50~80% 2번째 / 미만 1번째. (코스의 유닛 수보다 크면 마지막 유닛으로 clamp)
 * 건너뛴 유닛의 레슨들은 completedLessons에 미리 채워서 기존 Learn.tsx 진행도 로직을 그대로 쓴다.
 */
export const placementFor = (course: Course, accuracy: number) => {
  const desired = accuracy >= 0.8 ? 2 : accuracy >= 0.5 ? 1 : 0;
  const unitIdx = Math.min(desired, course.units.length - 1);
  const startingUnit = course.units[unitIdx];
  const unlockedLessonIds = course.units
    .slice(0, unitIdx)
    .flatMap((u) => u.lessons.map((l) => l.id));
  return { startingUnit, unitIdx, unlockedLessonIds };
};

export const courseById = (id: string): Course =>
  courses.find((co) => co.id === id) ?? python;

export const allLessons = () =>
  courses.flatMap((co) =>
    co.units.flatMap((u) => u.lessons.map((l) => ({ course: co, unit: u, lesson: l })))
  );

export const findLesson = (lessonId: string) =>
  allLessons().find((x) => x.lesson.id === lessonId);

/** 코스·진단을 통틀어 모든 문제 (취약 개념 태그 매핑용) */
export const allChallenges = (): Challenge[] => [
  ...allLessons().flatMap((x) => x.lesson.challenges),
  ...Object.values(diagnosticChallenges).flat(),
];

/** 오답노트용 — 문제 id로 문제 자체와 그 문제가 속한 레슨을 함께 찾는다 (재도전 링크에 필요) */
export const findChallengeContext = (challengeId: string) => {
  for (const { course, unit, lesson } of allLessons()) {
    const challenge = lesson.challenges.find((c) => c.id === challengeId);
    if (challenge) return { course, unit, lesson, challenge };
  }
  return undefined;
};
