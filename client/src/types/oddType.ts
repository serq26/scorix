export interface OddType {
  match_result: {
    home_win: number;
    away_win: number;
    draw: number;
  };
  total_goal_under_over: {
    one_and_half_over?: number;
    one_and_half_under?: number;
    two_and_half_over?: number;
    two_and_half_under?: number;
    three_and_half_over?: number;
    three_and_half_under?: number;
  };
  mutual_yes_no: {
    mutual_goal_yes?: number;
    mutual_goal_no?: number;
  };
  first_half_result: {
    first_half_home_win: number;
    first_half_draw: number;
    first_half_away_win: number;
  };
  double_chance: {
    double_chance_home_draw?: number;
    double_chance_away_draw?: number;
  };
  total_goal_odd_even: {
    total_goal_odd?: number;
    total_goal_even?: number;
  };
}
