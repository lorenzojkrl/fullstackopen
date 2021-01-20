const calculateBmi = (height: number, weight: number) : string => {
    const bmi = weight/(height/100)**2;
    if(bmi < 25){
        return 'Normal (Healthy Weight)';
    }else if (bmi >= 30){
        return 'Obese (Fancy a diet?)';
    }else{
        return 'Overweight (Unhealthy Weight)';
    }
};

export {calculateBmi};