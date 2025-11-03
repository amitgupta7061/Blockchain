fn main(){
    let nums = [10, 20, 30, 40, 50];
    for num in nums{
        print!("{} ", num);
    }
    println!();

    for num in 1..5{
        print!("{} ", num);
    }
    println!();

    for num in 1..=5{
        print!("{} ", num);
    }
    println!();

    for num in (1..5).rev(){
        print!("{} ", num);
    }
    println!();


    let mut cnt = 0;
    let result = loop {
        cnt += 1;
        println!("Again!");

        if cnt == 10 {
            break cnt * 2;
        }
    };

    println!("{}", result);
}