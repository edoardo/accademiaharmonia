# $Id: $
#
# feed - Perl module for manage RSS feeds

package feed;

use strict;
use HTTP::Date;
use Time::localtime;

use lib 'lib';

use XML::Simple;

our $cLanguage = 'it';

sub parse
{
    my $cFile = shift;

    return XMLin( $cFile );
}

sub getItems
{
    my $rRss = shift;

    my $rItems = $rRss->{'channel'}->{'item'};

    $rItems = [ $rItems ] if( ref $rItems && ref $rItems ne 'ARRAY' );

    return $rItems;
}

# Simple function for convert a date in `17 june 2005' format
sub formatDate
{
    my $nDate = shift;
    $cLanguage = shift;

    $nDate = str2time( $nDate ) || time();

    # Get date object
    my $date = localtime( $nDate );

    print join( "\n", 'date day='.$date->mday(),
                      'date month='.$date->mon(),
                      'date year='.$date->year() );

    my %aDays   = ( it => [ qw( Lun Mar Mer Gio Ven Sab Dom ) ],
                    en => [ qw( Sun Mon Tue Thu Wed Fri Sat ) ] );
    my %aMonths = ( it => [ qw( gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre ) ],
                    en => [ qw( january february march april may june july august september october november december ) ] );

#    return sprintf( '%s, %.2d %s %d', ( $aDays{$cLanguage}->[$date->wday()], $date->mday(), $aMonths{$cLanguage}->[$date->mon()], ( $date->year() + 1900 ) ) );
    return sprintf( '%.2d %s %d', ( $date->mday(), $aMonths{$cLanguage}->[$date->mon()], ( $date->year() + 1900 ) ) );
}

# Simple function for convert a time in `13:30:05' format
sub formatTime
{
    my $nTime = shift;
    
    $nTime ||= time();

    my $time = gmtime( $nTime );

    return sprintf( '%.2d:%.2d:%.2d', $time->hour(), $time->min(), $time->sec() );
}

1
