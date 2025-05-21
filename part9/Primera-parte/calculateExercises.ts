interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult  => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;


    if(average >= target){
        rating = 3;
        ratingDescription = "Great Job";
    } else if(average >= target * 0.75){
        rating = 2 ;
        ratingDescription = "You could do better";
    } else {
        rating =  1;
        ratingDescription = "Push harder!";
    }

    return {
         periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));