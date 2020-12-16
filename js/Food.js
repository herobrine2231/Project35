class Food
{
    preload()
    {
        var milkImage=loadImage("images/Milk.png");
    }

    constructor()
    {
        var foodStock,lastfed;
    }

    getFoodStock()
    {
        var foodCountRef=database.ref('Food');
        foodCountRef.on("value",function(data){
            foodStock=data.val();})
    }

    updateFoodStock()
    {
        database.ref('/').update(
            {
                Food:x
            }
        )
    }

    deductFoodStock(x)
    {
        if(x<=0)
        {
            x=0;
        }
        else{
            x=x-1;
        }
    }

    display()
    {
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,x,y,50,50);

        if(this.foodStock!=0)
        {
            for(var i=0; i<this.foodStock; i++)
            {
                if(i%10==0)
                {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    
}