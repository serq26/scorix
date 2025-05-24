const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server started at ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected ✅");

  const matches = [
    {
      id: 1,
      league: "Süper Lig",
      homeTeam: "Fenerbahçe",
      awayTeam: "Galatasaray",
      matchDate: "2025-05-26 20:00",
      category: "football",
      isLive: true,
      score: "0 - 0",
      odds: {
        match_result: {
          home_win: 1.85,
          draw: 3.2,
          away_win: 2.4,
        },
        total_goal_under_over: {
          one_and_half_under: 1.5,
          one_and_half_over: 2.0,
          two_and_half_under: 1.5,
          two_and_half_over: 2.0,
          three_and_half_under: 1.5,
          three_and_half_over: 2.0,
        },
        mutual_yes_no: {
          no_mutal_goal: 1.3,
          yes_mutal_goal: 1.25,
        },
        first_half_result: {
          first_half_home_win: 1.15,
          first_half_draw: 1.45,
          first_half_away_win: 2.15,
        },
        double_chance: {
          double_chance_home_draw: 2.5,
          double_chance_away_draw: 1.15,
        },
        total_goal_odd_even: {
          total_goal_odd: 1.5,
          total_goal_even: 2.6,
        },
      },
    },
    {
      id: 2,
      league: "NBA",
      homeTeam: "Lakers",
      awayTeam: "Celtics",
      matchDate: "2025-05-27 22:30",
      category: "basketball",
      isLive: false,
      odds: {
        match_result: {
          home_win: 1.85,
          draw: 3.2,
          away_win: 2.4,
        },
        total_goal_under_over: {
          one_and_half_under: 1.5,
          one_and_half_over: 2.0,
          two_and_half_under: 1.5,
          two_and_half_over: 2.0,
          three_and_half_under: 1.5,
          three_and_half_over: 2.0,
        },
        mutual_yes_no: {
          no_mutal_goal: 1.3,
          yes_mutal_goal: 1.25,
        },
        first_half_result: {
          first_half_home_win: 1.15,
          first_half_draw: 1.45,
          first_half_away_win: 2.15,
        },
        double_chance: {
          double_chance_home_draw: 2.5,
          double_chance_away_draw: 1.15,
        },
        total_goal_odd_even: {
          total_goal_odd: 1.5,
          total_goal_even: 2.6,
        },
      },
    },
    {
      id: 3,
      league: "Premier Lig",
      homeTeam: "Chelsea",
      awayTeam: "Arsenal",
      matchDate: "2025-05-27 19:00",
      category: "football",
      isLive: false,
      odds: {
        match_result: {
          home_win: 1.85,
          draw: 3.2,
          away_win: 2.4,
        },
        total_goal_under_over: {
          one_and_half_under: 1.5,
          one_and_half_over: 2.0,
          two_and_half_under: 1.5,
          two_and_half_over: 2.0,
          three_and_half_under: 1.5,
          three_and_half_over: 2.0,
        },
        mutual_yes_no: {
          no_mutal_goal: 1.3,
          yes_mutal_goal: 1.25,
        },
        first_half_result: {
          first_half_home_win: 1.15,
          first_half_draw: 1.45,
          first_half_away_win: 2.15,
        },
        double_chance: {
          double_chance_home_draw: 2.5,
          double_chance_away_draw: 1.15,
        },
        total_goal_odd_even: {
          total_goal_odd: 1.5,
          total_goal_even: 2.6,
        },
      },
    },
    {
      id: 4,
      league: "Bundes Liga",
      homeTeam: "Bayern Münih",
      awayTeam: "Köln",
      matchDate: "2025-05-27 19:30",
      category: "football",
      isLive: false,
      odds: {
        match_result: {
          home_win: 1.85,
          draw: 3.2,
          away_win: 2.4,
        },
        total_goal_under_over: {
          one_and_half_under: 1.5,
          one_and_half_over: 2.0,
          two_and_half_under: 1.5,
          two_and_half_over: 2.0,
          three_and_half_under: 1.5,
          three_and_half_over: 2.0,
        },
        mutual_yes_no: {
          no_mutal_goal: 1.3,
          yes_mutal_goal: 1.25,
        },
        first_half_result: {
          first_half_home_win: 1.15,
          first_half_draw: 1.45,
          first_half_away_win: 2.15,
        },
        double_chance: {
          double_chance_home_draw: 2.5,
          double_chance_away_draw: 1.15,
        },
        total_goal_odd_even: {
          total_goal_odd: 1.5,
          total_goal_even: 2.6,
        },
      },
    },
    {
      id: 5,
      league: "Süper Lig",
      homeTeam: "Beşiktaş",
      awayTeam: "Göztepe",
      matchDate: "2025-05-15 17:00",
      category: "football",
      isLive: false,
      odds: {
        match_result: {
          home_win: 1.85,
          draw: 3.2,
          away_win: 2.4,
        },
        total_goal_under_over: {
          one_and_half_under: 1.5,
          one_and_half_over: 2.0,
          two_and_half_under: 1.5,
          two_and_half_over: 2.0,
          three_and_half_under: 1.5,
          three_and_half_over: 2.0,
        },
        mutual_yes_no: {
          no_mutal_goal: 1.3,
          yes_mutal_goal: 1.25,
        },
        first_half_result: {
          first_half_home_win: 1.15,
          first_half_draw: 1.45,
          first_half_away_win: 2.15,
        },
        double_chance: {
          double_chance_home_draw: 2.5,
          double_chance_away_draw: 1.15,
        },
        total_goal_odd_even: {
          total_goal_odd: 1.5,
          total_goal_even: 2.6,
        },
      },
    },
    {
      id: 6,
      league: "Euro Lig",
      homeTeam: "Fenerbahçe Beko",
      awayTeam: "Barcelona",
      matchDate: "2025-05-28 20:30",
      category: "basketball",
      isLive: false,
      odds: {
        match_result: {
          home_win: 1.85,
          draw: 3.2,
          away_win: 2.4,
        },
        total_goal_under_over: {
          one_and_half_under: 1.5,
          one_and_half_over: 2.0,
          two_and_half_under: 1.5,
          two_and_half_over: 2.0,
          three_and_half_under: 1.5,
          three_and_half_over: 2.0,
        },
        mutual_yes_no: {
          no_mutal_goal: 1.3,
          yes_mutal_goal: 1.25,
        },
        first_half_result: {
          first_half_home_win: 1.15,
          first_half_draw: 1.45,
          first_half_away_win: 2.15,
        },
        double_chance: {
          double_chance_home_draw: 2.5,
          double_chance_away_draw: 1.15,
        },
        total_goal_odd_even: {
          total_goal_odd: 1.5,
          total_goal_even: 2.6,
        },
      },
    },
  ];

  const interval = setInterval(() => {
    matches.forEach((match) => {
      if (match.isLive) {
        const scoreA = Math.floor(Math.random() * 5);
        const scoreB = Math.floor(Math.random() * 5);
        match.score = `${scoreA} - ${scoreB}`;

        match.odds.match_result.home_win = parseFloat(
          (1.5 + Math.random() * 2).toFixed(2)
        );
        match.odds.match_result.draw = parseFloat(
          (2.5 + Math.random() * 2).toFixed(2)
        );
        match.odds.match_result.away_win = parseFloat(
          (1.5 + Math.random() * 2).toFixed(2)
        );
      }
    });

    ws.send(JSON.stringify({ type: 'categoryData', result: matches }));
  }, 50000);
  
  ws.on('message', (message) => {
    const { type, category } = JSON.parse(message);

    if (type === 'getCategoryData') {
      let result = matches.filter((match) => match.category === category) || [];
      result = result?.length === 0 ? undefined : result;
      ws.send(JSON.stringify({ type: 'categoryData', category, result }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected ❌");
    clearInterval(interval);
  });
});